const express = require('express'),
    load = require('express-load'),
    bodyParser = require('body-parser'),
    path = require('path'),
    http = require('http');

module.exports = function() {
    let app = express(),
        fs = require('fs'),
        config = null;

    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, token');
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        next();
    });

    fs.readFile('./config/server_config.json','', function(err, data) {
        config = JSON.parse(data);

        app.set('porta', config ? config.porta : 3000);
        http.createServer(app).listen(app.get('porta'), function(){
            console.log('Express Server escutando na porta ' + app.get('porta'));
        });
    });

    app.use(express.static('./public'));

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(require('method-override')());

    load('models').into(app);
    load('controllers').into(app);
    load('routes').into(app);

    app.get('*', function (request, response){
        response.sendFile(path.resolve('.', 'public', 'index.html'))
    });

    return app;
};

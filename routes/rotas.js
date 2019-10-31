module.exports = function (app) {

    let controller = app.controllers.requisicaoController;

    app.route('/novarequisicao')
        .post(controller.novaRequisicao);
};

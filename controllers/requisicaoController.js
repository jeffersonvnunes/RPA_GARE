module.exports = function () {
    const Nightmare = require('nightmare');
    let controller = {};

    controller.novaRequisicao = function(req, res) {

        try{
            const SITE = 'https://www3.fazenda.sp.gov.br/Simp/';
            const getGare = async doc => {

                const nightmare = new Nightmare({ show: true });

                try {
                    await nightmare
                        .goto(SITE)
                        .wait('#rblTipo_0')
                        .click('#rblTipo_0')
                        .type('#txtCpf', doc.cnpj)
                        .click('#rblConsulta_0')
                        .type('#txtNumDoc', doc.nr_di)
                        .click('#btnConsultar')
                        .wait('#txtDataVenc')
                        .type('#txtDataVenc', '')
                        .type('#txtRef', '')
                        .click('#RdbIEinscrito_1')
                        .type('#txtDataVenc', doc.data_vencimento)
                        .type('#txtRef', doc.mes_ref)
                        .click('#btnContinuar')
                        .wait('#btnGare')
                        .click('#btnGare')
                        .wait('#txtObs')
                        .type('#txtObs',doc.obs_complementar)
                        .select('#ddlArmazem',doc.recinto)
                        .type('#txtMulta',doc.vl_multa)
                        .type('#txtReceita',doc.vl_receita)
                        .type('#txtMulta',doc.vl_multa)
                        .type('#txtJuros',doc.vl_juros)
                        .type('#txtMulta',doc.vl_multa)
                        .click('#btnSair')
                        .end();
                    return {};
                } catch(e) {
                    console.error(e);
                }
            };

            getGare(req.body).then( a => {
                res.status(200).send('OK"');
            }).catch(e => {
                console.log("Got error: " +erro.message);
                res.status(500).send(erro.message);
            });

        } catch (erro) {
            console.log("Got error: " +erro.message);
            res.status(500).send(erro.message);
        }
    };


    return controller;
};

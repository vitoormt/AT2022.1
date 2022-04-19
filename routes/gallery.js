const multer = require('multer')

module.exports = (app) => {

    //importar as configs do database
    var conexao = require('../config/database')

    //importae o model gallery
    var gallery = require('../models/gallery')

    //abrir o formulário
    app.get('/gallery', async(req, res) => {
        //conectar com o banco de dados
        conexao()

        //buscar os documentos grvados na coleção gallery
        var documento = await gallery.find()

        //enviar os documentos para a página ejs
        res.render('gallery.ejs', { resultado: documento })
    })

    //importar as configurações do upload
    var upload = require('../config/upload')

    //fazer o upload da imagem na pasra de destino
    app.post('/gallery', (req, res) => {

        //tentar fazer o upload da imagem
        upload(req, res, async(err) => {
            if (err instanceof multer.MulterError) {
                res.send("O arquivo é muito grande")
            } else if (err) {
                res.send("Tipo de arquivo inválido")
            } else {
                //conectar com a datrabase
                conexao()

                //gravar  o nome do arquivo nas pasta de destino
                var arquivo = new gallery({
                    arquivo: req.file.filename
                }).save()

                //após o upload voltar para o formulário
                res.redirect('/gallery')
            }
        })
    })
}
module.exports = (app) => {
    var conexao = require('../config/database')
    conexao()

    var modelo = require('../models/mensagem')

    var mygrids = require('../models/mygrid')

    var gallery = require('../models/gallery')


    app.get('/', async(req, res) => {
        var mygrid = await mygrids.find().limit(6).sort({ '_id': -1 })
        var imagens = await gallery.find().limit(6).sort({ '_id': -1 })

        res.render('index.ejs', { dados: mygrid, gallery: imagens })

    })

    app.post('/', (req, res) => {

        var documento = new modelo({
                nome: req.body.first_name,
                sobrenome: req.body.last_name,
                email: req.body.email,
                mensagem: req.body.message
            })
            .save()
            .then(() => {
                res.redirect('/')
            })
            .catch(() => {
                res.send("Não foi possivel gravar o documento no Banco de Dados")
            })
    })

}
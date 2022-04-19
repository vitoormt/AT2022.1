const mongoose = require('mongoose')

const conexao = async () => {

    var atlas = await mongoose.connect('mongodb+srv://userProf:prof1234@cluster1.uman3.mongodb.net/test')
}

module.exports = conexao
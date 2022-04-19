//importar o pacote multer
const multer = require('multer')

//configurar o padrao de armazenamento
const armazenamento = multer.diskStorage(
    //pasta de destino
    {
        destination: (req, file, cb) => {
            cb(null, './assets/images/')
        },
        //destino o padrao para as imagens dos arquivos
        filename: (req, file, cb) => {
            cb(null, Date.now() + file.originalname)
        }
    }
)

var tamanho = 100 * 1024

var upload = multer({
    storage: armazenamento,
    limits: { fileSize: tamanho },
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg"
        ) {
            cb(null, true)
        } else {
            cb(null, false)
            return cb(new Error('Tipo de arquivo inválido'))
        }
    }
}).single('imagem')

module.exports = upload
const User = require('./model')
// TRAZENDO BCRYPT PARA ENCRIPTAR A SENHA DO USUARIO
const bcrypt = require('bcryptjs')
// TRAZENDO JWT PARA TRABALHAR COM AUTENTICAÇÃO DE USUARIO ATRAVÉS DO TOKEN
const jwt = require('jsonwebtoken')
// MAILER
const mailer = require('../../infraestucture/mailer')
// IMPORTANDO O MD5 GERADO PARA SER CONVERTIDO JUNTO COM O TOKEN GERADO PELO USUARIO
const authConfig = require('../../config/auth.json')

// FUNÇÃO QUE GERA UM TOKEN, PASSANDO O USERID NOS PARAMETROS.
function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    })
}

// FUNCIONALIDADES QUE IRÃO MANIPULAR OS DADOS E REDIRECIONAMENTO DO USUARIO NA APLICAÇÃO
class UserController {
    async create(req, res) {
        try {
            const { name, email, password } = req.body

            if (!name || !password || !email) res.send(400, 'Verifique os parametros enviados e tente novamente')

            if (await User.findOne({ email })) res.send(400, 'Usuario ja existente!')

            const user = await User.create(req.body)

            user.password = undefined

            // FUNÇÃO QUE CHAMA O METODO DE ENVIO DE EMAIL, NO PARAMETRO SERÁ PASSADO O EMAIL.
            mailer.sendMail(email)

            res.send(200, {
                user,
                token: generateToken({ id: user._id })
            })
        } catch (err) {
            throw new Error(err)
        }

    }
    async authenticate(req, res) {
        try {
            const { email, password } = req.body

            const user = await User.findOne({ email }).select('+password')

            if (!user) res.send(401, { error: 'usuario nao encontrado!' })

            if (!await bcrypt.compare(password, user.password)) res.send(401, { error: 'senha errada' })

            user.password = undefined

            res.send(200, {
                user,
                token: generateToken({ id: user._id })
            })

        } catch (err) {
            throw new Error(err)
        }
    }
    async listUsers(req, res) {
        try {
            const user = await User.find()
            res.send(200, user)
        } catch (err) {
            throw new Error(err)
        }
    }
}

module.exports = new UserController
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.send({ error: 'token nao foi providenciado' })
    }

    const parts = authHeader.split(' ')

    if (!parts.length === 2) {
        return res.send('Erro de token')
    }

    const [scheme, token] = parts

    if (!/^Bearer$/i.test(scheme)) {
        return res.send({ error: 'token mal formatado' })
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) {
            return res.send({ error: 'token inválido' })
        }

        req.userId = decoded.id
        return next()
    })
}
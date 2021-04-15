const Request = require('supertest')

const crypto = require('crypto')

const generate = () => {
    return crypto.randomBytes(20).toString('hex')
}

let content = generate()

const app = 'http://localhost:3000'

describe('usuario na aplicação', () => {
    it('Deve criar um usuario', async () => {
        const res = await Request(app)
            .post('/user/create')
            .send({
                name: content,
                email: content,
                password: content
            })

        expect(res.status).toBe(200)
    })

    it('Usuario se autentica na aplicação', async () => {
        const res = await Request(app)
            .post('/user/authenticate')
            .send({
                email: content,
                password: content
            })

        expect(res.status).toBe(200)
    })

    it('Deve retornar todos os usuarios da aplicação', async () => {
        const res = await Request(app)
            .get('/user/listuser')

        expect(res.status).toBe(200)
        expect(res.body).not.toBe(null)
    })
})
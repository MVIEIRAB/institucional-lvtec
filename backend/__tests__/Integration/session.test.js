const Request = require('supertest')

const dbHandler = require('../db-handler')
const mongoose = require('mongoose')
const MongoMemoryServer = require('mongodb-memory-server')

let mongoServer
let mongoUri

beforeAll(async () => {
    mongoServer = new MongoMemoryServer()
    const mongoUri = await mongoServer.getUri()
    await mongoose.connect(mongoUri, opts, (err) => {
        if (err) console.error(err)
    })
})

afterAll(async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
})

describe('...', () => {
    it('...', async () => {
        const User = mongoose.model('User', new mongoose.Schema({ name: String }))
        const count = await User.count()
        expect(count).toEqual(0)
    })
})

const app = mongoUri

describe('usuario na aplicação', () => {
    it('Deve criar um usuario', async () => {
        const res = await Request(app)
            .post('/user/create')
            .send({
                name: 'Matheus',
                email: 'mabasambasdsaaads@gmail.com',
                password: 'jacapodre123'
            })

        expect(res.status).toBe(200)
        expect(res.body.user.name).toBe('Matheus')
    })

    it('Usuario se autentica na aplicação', async () => {
        const res = await Request(app)
            .post('/user/authenticate')
            .send({
                email: 'mavb.financas@gmail.com',
                password: 'jacapodre123'
            })
        console.log(res)
        expect(res.status).toBe(200)
    })

    it('Deve retornar todos os usuarios da aplicação', async () => {
        const res = await Request(app)
            .get('/user/listuser')

        expect(res.status).toBe(200)
        expect(res.body).not.toBe(null)
    })
})
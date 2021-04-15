const Request = require('supertest')

const crypto = require('crypto')

const app = 'http://localhost:3000'

const generate = () => {
    return crypto.randomBytes(10).toString('hex')
}

let content = generate()

var token
var projectId

beforeAll(async () => {
    const res = await Request(app)
        .post('/user/authenticate')
        .send({
            email: '1d791c6e1675405184e07aecba8c6916076ad409',
            password: '1d791c6e1675405184e07aecba8c6916076ad409'
        })

    token = res.body.token
})

describe('Manipulando Projetos', () => {
    it('Listando todos os projetos', async () => {
        const res = await Request(app)
            .get('/project/find')
            .set('Authorization', `Bearer ${token}`)

        expect(res.status).toBe(200)
        expect(res.body.data).not.toBe(null)
    })

    it('Deve criar um projeto', async () => {
        const res = await Request(app)
            .post('/project/create')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: content, description: content, url: content, logo: content })

        projectId = res.body.project._id

        expect(res.status).toBe(200)
    })

    it('Listando projetos pelo ID', async () => {
        const res = await Request(app)
            .get(`/project/findperid/${projectId}`)
            .set('Authorization', `Bearer ${token}`)

        expect(res.status).toBe(200)
        expect(res.body).not.toBe(null)
    })


    it('Deve deletar um projeto pelo ID', async () => {
        const res = await Request(app)
            .del(`/project/delete/${projectId}`)
            .set('Authorization', `Bearer ${token}`)

        expect(res.status).toBe(204)
    })
})
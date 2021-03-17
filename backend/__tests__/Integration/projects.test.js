const Request = require('supertest')

const crypto = require('crypto')

const app = 'http://localhost:3000'

let token

const generate = () => {
    return crypto.randomBytes(20).toString('hex')
}

const content = generate()

beforeAll(async () => {
    const res = await Request(app)
        .post('/user/authenticate')
        .send({
            email: 'mab@gmail.com',
            password: 'jacapodre123'
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

    it('Listando projetos pelo ID', async () => {
        const projectId = "60395df23774471f3035b1c0"
        const res = await Request(app)
            .get(`/project/findperid/${projectId}`)
            .set('Authorization', `Bearer ${token}`)
        expect(res.status).toBe(200)
        expect(res.body).not.toBe(null)
    })

    it('Deve criar um projeto', async () => {
        const res = await Request(app)
            .post('/project/create')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: content, description: content, url: content, logo: content })
        expect(res.status).toBe(200)
    })

    it('Deve deletar um projeto pelo ID', async () => {
        const res = await Request(app)
            .del(`/project/delete/603961663774471f3035b1c7`)
            .set('Authorization', `Bearer ${token}`)
        expect(res.status).toBe(204)
    })
})
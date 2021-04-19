const restify = require('restify')

// IMPORTANDO CONFIGURAÇÃO PREDEFINIDA DO MONGOOSE (BANCO DE DADOS)
const mongoose = require('./infraestucture/db')

// IMPORTANDO CONTROLLER DAS FUNCIONALIDADES DE CADA ROTA
const ProjectCollection = require('./modules/project/controller')
const UserController = require('./modules/user/controller')

// MIDDLEWARE DE VALIDAÇÃO DE CREDENCIAIS
const authMiddleware = require('./middlewares/auth')

// SETANDO O SERVIDOR RESTIFY
const app = restify.createServer()

const HOST = '0.0.0.0'

app.listen(process.env.PORT || 3000, HOST, () => { console.log('server has iniciated') })

// BODYPARSER
app.use(restify.plugins.bodyParser());

// CONECTANDO AO BANCO DE DADOS
const db = mongoose.connection
db.once('open', () => {
    console.log('database connected!')
})
    .on('error', (err) => { console.log('connection error!', err) })

// ROTA DE INICIALIZAÇÃO DA APLICAÇÃO
app.get('/', (req, res) => {
    res.send('Bem vindo ao LVTEC Institucional.')
    res.end()
})

// ROTAS DA APLICAÇÃO (CRIAÇÃO DE PROJETOS)
app.post('/project', authMiddleware, ProjectCollection.create)

app.patch('/project/:id', authMiddleware, ProjectCollection.update)

app.put('/project/:id', authMiddleware, ProjectCollection.insert)

app.del('/project/:id', authMiddleware, ProjectCollection.delete)

app.get('/project', authMiddleware, ProjectCollection.find)

app.get('/project/:id', authMiddleware, ProjectCollection.findById)

// ROTAS DA APLICAÇÃO (CRIAÇÃO E AUTENTICAÇÃO DE USUARIOS)
app.put('/user', UserController.create)
app.post('/user', UserController.authenticate)
app.get('/user', authMiddleware, UserController.listUsers)
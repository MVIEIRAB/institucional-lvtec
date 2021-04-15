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

app.listen(process.env.PORT || 3000, () => { console.log('server has iniciated') })

// BODYPARSER
app.use(restify.plugins.bodyParser());

// CONECTANDO AO BANCO DE DADOS
const db = mongoose.connection
db.once('open', () => {
    console.log('database connected!')
}).on('error', (error) => { console.log('connection error!', error) })

// ROTAS DA APLICAÇÃO (CRIAÇÃO DE PROJETOS)
app.post('/project/create', authMiddleware, ProjectCollection.create)

app.patch('/project/update/:id', authMiddleware, ProjectCollection.update)

app.put('/project/insert/:id', authMiddleware, ProjectCollection.insert)

app.del('/project/delete/:id', authMiddleware, ProjectCollection.delete)

app.get('/project/find', authMiddleware, ProjectCollection.find)

app.get('/project/findperid/:id', authMiddleware, ProjectCollection.findById)

// ROTAS DA APLICAÇÃO (CRIAÇÃO E AUTENTICAÇÃO DE USUARIOS)
app.post('/user/create', UserController.create)
app.post('/user/authenticate', UserController.authenticate)
app.get('/user/listuser', authMiddleware, UserController.listUsers)
const mongoose = require('mongoose')

require('dotenv/config')

const pass = process.env.DB_PASS
const user = process.env.DB_USER

mongoose.connect(`mongodb+srv://${user}:${pass}@cluster0.te9ly.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

module.exports = mongoose
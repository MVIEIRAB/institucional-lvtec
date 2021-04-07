const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://herokuuser:<12345>@cluster0.te9ly.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

module.exports = mongoose
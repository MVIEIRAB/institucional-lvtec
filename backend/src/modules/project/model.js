const mongoose = require('../../infraestucture/db')

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    url: {
        type: String
    },
    logo: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Project = mongoose.model('Project', ProjectSchema)

module.exports = Project
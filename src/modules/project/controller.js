const Project = require('./model')
const User = require('../user/model')

class ProjectCollection {
    async find(req, res) {
        try {
            const user = await User.findById({ _id: req.userId })
            const data = await Project.find({ _id: { $in: user.projects || [] } })
            res.send(200, { data })
        } catch (err) {
            console.log(err)
        }

    }
    async findById(req, res) {
        try {
            const data = await Project.findById(req.params.id)
            res.send(200, { data })
        } catch (err) {
            console.log(err)
        }
    }
    async create(req, res) {
        try {
            const project = await Project.create({ ...req.body })
            await User.updateOne({ _id: req.userId }, { $push: { projects: project._id } })
            res.send(200, { project })
        } catch (err) {
            console.log(err)
        }
    }
    async update(req, res) {
        try {
            const projectUpdate = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true })
            res.send(200, projectUpdate)
        } catch (err) {
            console.log(err)
        }
    }
    async insert(req, res) {
        try {
            const projectUpdate = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true })
            res.send(200, projectUpdate)
        } catch (err) {
            console.log(err)
        }
    }
    async delete(req, res) {
        try {
            const data = await Project.deleteOne({ _id: req.params.id })
            res.send(200, data)
        } catch (err) {
            res.send(400, err)
            console.log(err)
        }
    }
}

module.exports = new ProjectCollection
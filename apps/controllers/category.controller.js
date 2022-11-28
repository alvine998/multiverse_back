const Categories = require('../models/category.model.js');

exports.list = async (req, res) => {
    var query = {}
    if (req.query.status) {
        query.status = req.query.status
    }
    try {
        const result = await Categories.find({ $or: [{ deleted: 0 }, { status: req.query.status }] })
        if (!result) {
            return res.status(404).send('Gagal mendapatkan data')
        }
        return res.status(200).send(result)
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while retrieving notes."
        });
    }
}

exports.create = async (req, res) => {
    const payload = {
        name: req.body.name,
        status: req.body.status || 0,
        deleted: req.body.deleted || 0
    }

    try {
        const result = await Categories.create(payload)
        if (!result) {
            return res.status(404).send('Gagal menambahkan data')
        }
        return res.status(200).send(result)
    } catch (error) {
        return res.status(500).send('Server Internal Error : ' + error)
    }
}

exports.update = async (req, res) => {
    try {
        const result = await Categories.findByIdAndUpdate(req.query.id, req.body, { new: true })
        if (!result) {
            return res.status(404).send({
                message: "users not found with id " + req.query.id
            });
        }
        return res.status(200).send(result)
    } catch (error) {
        return res.status(500).send({
            message: "Error updating users with id " + req.query.id + ` : ${error}`
        });
    }
}

exports.delete = async (req, res) => {
    try {
        const result = await Categories.findByIdAndUpdate(req.query.id, { deleted: 1 }, { new: true })
        if (!result) {
            return res.status(404).send({
                message: "users not found with id " + req.query.id
            });
        }
        return res.status(200).send(result)
    } catch (error) {
        return res.status(500).send({
            message: "Error updating users with id " + req.query.id + ` : ${error}`
        });
    }
}

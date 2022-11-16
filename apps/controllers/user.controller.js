const Users = require('../models/user.model.js');
const bcrypt = require('bcryptjs');

// Create and Save a new Note
exports.create = async (req, res) => {

    const existEmail = await Users.findOne({ email: req.body.email })
    console.log(existEmail)
    if(existEmail){
        if (existEmail.email == req.body.email) {
            return res.status(404).send({
                message: "Email telah terdaftar"
            });
        }
    }
    try {
        const users = new Users({
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            status: req.body.status || 0
        });
        const result = await users.save()
        if (!result) {
            return res.status(404).send('Gagal Menyimpan Data')
        }
        return res.status(200).send(result)
    } catch (error) {
        res.status(500).send({
            message: error || "Some error occurred while creating the Note."
        });
        return
    }
};

exports.onLogin = (req, res) => {
    Users.findOne({ email: req.body.email })
        .then(users => {
            if (!users) {
                return res.status(404).send({
                    message: "Email belum terdaftar"
                });
            } else {
                bcrypt.compare(req.body.password, users.password, (err, result) => {
                    if (result == true) {
                        res.status(200).send({ Success: "Login Ok" })
                    } else {
                        res.status(500).send({ Failed: "Password Salah!" })
                    }
                })
            }
        })
}

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    var query = {}
    if (req.query.status) {
        query.status = req.query.status
    }
    if (req.query.email) {
        query.email = req.query.email
    }
    if (req.query._id) {
        query._id = req.query._id
    }
    Users.find(query)
        .then(userss => {
            res.send(userss);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Find note and update it with the request body
    Users.findByIdAndUpdate(req.params.usersId,
        req.body
        , { new: true })
        .then(users => {
            if (!users) {
                return res.status(404).send({
                    message: "users not found with id " + req.params.usersId
                });
            }
            res.send(users);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "users not found with id " + req.params.usersId
                });
            }
            return res.status(500).send({
                message: "Error updating users with id " + req.params.usersId
            });
        });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Users.findById(req.params.usersId)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "users not found with id " + req.params.usersId
                });
            }
            res.send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "users not found with id " + req.params.usersId
                });
            }
            return res.status(500).send({
                message: "Error retrieving users with id " + req.params.usersId
            });
        });
};

// Find a single note with a noteId
exports.findOneEmail = (req, res) => {
    const emails = req.params.emails;
    Users.findOne({ "email": emails })
        .then(users => {
            if (!users) {
                return res.status(404).send({
                    message: "Email not found with id " + req.params.emails
                });
            }
            res.send(users);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "users not found with id " + req.params.emails
                });
            }
            return res.status(500).send({
                message: "Error retrieving users with id " + req.params.emails
            });
        });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Users.findByIdAndRemove(req.params.usersId)
        .then(users => {
            if (!users) {
                return res.status(404).send({
                    message: "users not found with id " + req.params.usersId
                });
            }
            res.send({ message: "users deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "users not found with id " + req.params.usersId
                });
            }
            return res.status(500).send({
                message: "Could not delete users with id " + req.params.usersId
            });
        });
};
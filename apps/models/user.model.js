const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({
    name: String,
    phone: String,
    password: String,
    email: String,
    status: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Users', UsersSchema);
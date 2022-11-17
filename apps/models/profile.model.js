const mongoose = require('mongoose');

const ProfilesSchema = mongoose.Schema({
    name: String,
    address: String,
    phone: String,
    email: String,
    lat: String,
    long: String,
    vision: String,
    mission: String,
    logo: String,
    status: Number,
    deleted: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Profiles', ProfilesSchema);
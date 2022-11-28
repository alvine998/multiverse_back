const mongoose = require('mongoose');

const CategoriesSchema = mongoose.Schema({
    name: String,
    status: Number,
    deleted: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Categories', CategoriesSchema);
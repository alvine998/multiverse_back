const mongoose = require('mongoose');

const ProductsSchema = mongoose.Schema({
    name: String,
    category_id: Number,
    category_name: String,
    description: String,
    price:Number,
    stock: Number,
    status: Number,
    deleted: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Products', ProductsSchema);
module.exports = (app) => {
    const users = require('../controllers/user.controller.js');
    const profiles = require('../controllers/profile.controller.js');
    const categories = require('../controllers/category.controller.js');
    const products = require('../controllers/product.controller.js');

    // define a simple route
    app.get('/', (req, res) => {
        res.json({ "message": "Server Work" });
    });

    app.post('/users', users.create);
    app.post('/users/login', users.onLogin);
    app.get('/users', users.findAll);
    app.get('/users/:usersId', users.findOne);
    app.get('/users/mail/:emails', users.findOneEmail);
    app.delete('/users/:usersId', users.delete)
    app.patch('/users/:usersId', users.update)

    // Profile
    app.get('/profiles', profiles.list)
    app.post('/profile', profiles.create)
    app.patch('/profile', profiles.update)
    app.delete('/profile', profiles.delete)

    // Category
    app.get('/categories', categories.list)
    app.post('/category', categories.create)
    app.patch('/category', categories.update)
    app.delete('/category', categories.delete)

    // Product

}
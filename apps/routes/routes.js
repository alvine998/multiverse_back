module.exports = (app) => {
    const users = require('../controllers/user.controller.js');
    app.post('/users', users.create);
    app.post('/users/login', users.onLogin);
    app.get('/users', users.findAll);
    app.get('/users/:usersId', users.findOne);
    app.get('/users/mail/:emails', users.findOneEmail);
    app.delete('/users/:usersId', users.delete)
    app.patch('/users/:usersId', users.update)
}
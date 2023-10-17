const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controller/error');
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findByPk('6525152a229cb0f9f0af3ab0')
    .then(user => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404Page);

mongoose
.connect('mongodb+srv://nwetmon:PUvIsZqJ7PFFtN4K@cluster0.3anlxrd.mongodb.net/shop?retryWrites=true&w=majority&appName=AtlasApp')
.then( result => {
  app.listen(3000);
})
.catch(err => {
  console.log(err);
})

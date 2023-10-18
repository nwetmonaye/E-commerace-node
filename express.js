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
  User.findById('652f50da14b6cc9c424c69e2')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404Page);

mongoose
.connect('mongodb+srv://nwetmon:ioMzbO9duboylv1K@cluster0.3anlxrd.mongodb.net/shop?retryWrites=true&w=majority&appName=AtlasApp')
.then( result => {
  User.findOne().then(user => {
  if(!user){
    const user = new User ({
    name: 'Nwet',
    email: 'nwettest.com',
    cart: {
      items: []
    }
  });
   user.save();
    }
  });

  app.listen(3000);
})
.catch(err => {
  console.log(err);
})

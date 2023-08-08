// const http = require('http');
const path = require('path');
const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname,'public')));


app.use('/admin',adminRoutes);
app.use(shopRoutes);

app.use((req,res,next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

// app.use('/', (req,res,next) => {
    // console.log('This always runs!!');
//     next();
// })
// app.use('/add-product',(req,res, next) => {
//     console.log('In the middleware');
//     next();
//      res.send('<h1>The "Add product" page</h1>');
//     res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>');
   
// });
// app.use('/product', (req,res,next) => {
//     console.log(req.body);
//     res.redirect('/home');
// });

// app.post('/product', (req,res,next) => {
//     console.log(req.body);
//     res.redirect('/home');
// });

// app.use('/home',(req,res, next) => {
//     console.log('In another middleware');
//     res.send('<h1>Hello</h1>');
// });

// const server = http.createServer(app);
app.listen(3000);


// yesterday become 16.
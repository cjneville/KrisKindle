const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
const userRoutes = require('./routes/userRoutes');
// express app
const app = express();
const PORT = process.env.PORT || 3000

// connect to mongodb & listen for requests
const dbURI = 'mongodb+srv://kriskringle:kriskringle@kriskringle.veoyp.mongodb.net/KrisKringle?retryWrites=true&w=majority';
 mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
   .then(result => app.listen(PORT))
   .catch(err => console.log(err));
// app.listen(PORT, () => {
//   console.log(`Example app listening at http://localhost:${PORT}`)
// })

// register view engine
app.set('view engine', 'ejs');

app.use(express.json());
// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// routes
app.get('/', (req, res) => {
  res.redirect('/users');
});


app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', blogRoutes);
app.use('/users', userRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

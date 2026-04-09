const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Make site data and current path available to all templates
app.use((req, res, next) => {
  res.locals.site = require('./data/site.json');
  res.locals.currentPath = req.path;
  next();
});

// Routes
app.use('/', require('./routes/index'));
app.use('/api', require('./routes/form'));

// 404 handler
app.use((req, res) => {
  res.status(404).render('home', {
    title: 'Page Not Found | Maati Interiors',
    description: 'Page not found.',
    home: require('./data/home.json')
  });
});

app.listen(PORT, () => {
  console.log(`Maati Interiors running on http://localhost:${PORT}`);
});

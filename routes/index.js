const express = require('express');
const router = express.Router();

// Home
router.get('/', (req, res) => {
  const home = require('../data/home.json');
  res.render('home', {
    title: 'Maati Interiors | Residential & Commercial Design Studio',
    description: 'Maati Interiors is a residential and commercial interior design studio creating spaces that balance function and beauty.',
    home
  });
});

// Portfolio
router.get('/portfolio', (req, res) => {
  const portfolio = require('../data/portfolio.json');
  res.render('portfolio', {
    title: 'Portfolio Projects | Maati Interiors',
    description: 'Explore our portfolio of residential and commercial interior design projects.',
    portfolio
  });
});

// About
router.get('/about', (req, res) => {
  const about = require('../data/about.json');
  res.render('about', {
    title: 'About Nilakshi Roy | Maati Interiors',
    description: 'Meet Nilakshi Roy, Founder and Principal Designer of Maati Interiors.',
    about
  });
});

// Services
router.get('/services', (req, res) => {
  const services = require('../data/services.json');
  res.render('services', {
    title: 'Interior Design Services | Maati Interiors',
    description: 'Explore our interior design services including new builds, renovations, and sensory friendly design.',
    services
  });
});

// Process
router.get('/process', (req, res) => {
  const processData = require('../data/process.json');
  res.render('process', {
    title: 'Our Design Process | Maati Interiors',
    description: 'Learn about our thoughtful, intuitive design process.',
    processData
  });
});

// FAQ
router.get('/faq', (req, res) => {
  const faq = require('../data/faq.json');
  res.render('faq', {
    title: 'Frequently Asked Questions | Maati Interiors',
    description: 'Answers to common questions about working with Maati Interiors.',
    faq
  });
});

// Inquire
router.get('/inquire', (req, res) => {
  const inquire = require('../data/inquire.json');
  res.render('inquire', {
    title: 'Inquire | Maati Interiors',
    description: 'Get in touch to start your dream project with Maati Interiors.',
    inquire
  });
});

module.exports = router;

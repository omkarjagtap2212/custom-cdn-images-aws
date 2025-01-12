const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');

// Upload Image
router.post('/upload', imageController.uploadImage);

// Optimize Image
router.post('/optimize', imageController.optimizeImage);

// Serve Image
router.get('/serve', imageController.serveImage);

module.exports = router;
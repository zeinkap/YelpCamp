const express = require('express');
const router = express.Router();
const restaurants = require('../controllers/restaurants');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validaterestaurant } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

const restaurant = require('../models/restaurant');

router.route('/')
    .get(catchAsync(restaurants.index))
    .post(isLoggedIn, upload.array('image'), validaterestaurant, catchAsync(restaurants.createrestaurant))


router.get('/new', isLoggedIn, restaurants.renderNewForm)

router.route('/:id')
    .get(catchAsync(restaurants.showrestaurant))
    .put(isLoggedIn, isAuthor, upload.array('image'), validaterestaurant, catchAsync(restaurants.updaterestaurant))
    .delete(isLoggedIn, isAuthor, catchAsync(restaurants.deleterestaurant));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(restaurants.renderEditForm))



module.exports = router;
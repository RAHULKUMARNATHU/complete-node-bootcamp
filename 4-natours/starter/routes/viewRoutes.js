const express = require('express');
const viewsController = require('./../controllers/viewsController');
const authController = require('./../controllers/authController');
const bookingController = require('./../controllers/bookingController');

const router = express.Router();

router.use(viewsController.alerts);
/*ALL Tours */
router.get(
  '/',
  // bookingController.createBookingCheckout,
  authController.isLoggedIn,
  viewsController.getOverview,
);
/*get tour details */
router.get('/tour/:slug', authController.isLoggedIn, viewsController.getTour);
/*Login Route */
router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get('/signup', authController.isLoggedIn, viewsController.getSignupForm);
router.get('/me', authController.protect, viewsController.getAccount);
router.get('/my-tours', authController.protect, viewsController.getMyTours);
router.get('/forgotPassword' , viewsController.forgotPassword);
router.get('/:token' , viewsController.resetPassword);

router.post(
  '/submit-user-data',
  authController.protect,
  viewsController.updateUserData,
);

module.exports = router;

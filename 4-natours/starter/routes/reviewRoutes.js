const express = require('express');

const reviewController = require('./../controllers/reviewController');
const authController = require('./../controllers/authController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo('user', 'admin'),
    reviewController.setTourUserIds,
    reviewController.createReview,
  );

router
  .route('/:id')
  .get(reviewController.getReviewById)
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    reviewController.deleteReview,
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    reviewController.updateReview,
  );

module.exports = router;

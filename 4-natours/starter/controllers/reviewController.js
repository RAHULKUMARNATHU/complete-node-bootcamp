const Review = require('./../models/reviewModel');
const handlerFactory = require('./handlerFactory');
// const catchAsync = require('../utils/catchAsync');
4;

exports.setTourUserIds = (req, res, next) => {
  /*Allow nested routes */
  if (!req.body.tour) req.body.tour = req.params.tourId;
  req.body.user = req.user.id;
  next();
};

exports.getAllReviews = handlerFactory.getAll(Review);
exports.getReviewById = handlerFactory.getOne(Review);
exports.createReview = handlerFactory.createOne(Review);
exports.updateReview = handlerFactory.updateOne(Review);
exports.deleteReview = handlerFactory.deleteOne(Review);

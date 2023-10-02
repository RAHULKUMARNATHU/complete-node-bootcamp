const Review = require('./../models/reviewModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const doc = await Review.find();
  res.status(200).json({
    status: 'success',
    results: doc.length,
    data: {
      data: doc,
    },
  });
});

exports.getReviewById = catchAsync(async (req, res, next) => {});

exports.createReview = catchAsync(async (req, res, next) => {
  const doc = await Review.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});

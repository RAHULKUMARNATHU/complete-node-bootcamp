const Review = require('./../models/reviewModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.tourId) filter = { tour: req.params.tourId };

  const doc = await Review.find(filter);

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
  /*Allow nested routes */
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  const doc = await Review.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});

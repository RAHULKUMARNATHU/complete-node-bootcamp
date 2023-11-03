const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const Tour = require('./../models/tourModel');
const User = require('./../models/userModel');
const AppError = require('./../utils/appError');
exports.getOverview = catchAsync(async (req, res) => {
  /*1) Get tour data from collection */
  const tours = await Tour.find();
  /*2) Build template */

  /*3) Render that template using tour 1)*/
  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });

  if (!tour) next(new AppError('There is no tour with that name. ', 404));

  res
    .status(200)
    .set(
      'Content-Security-Policy',
      'connect-src https://*.tiles.mapbox.com https://api.mapbox.com https://events.mapbox.com',
    )
    .render('tour', {
      title: `${tour.name} Tour`,
      tour,
    });
});

/*Login Route for views */

exports.getLoginForm = catchAsync(async (req, res) => {
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com",
    )
    .render('login', {
      title: 'Log into your account',
    });
});

/*sign-up Route for views */
exports.getSignupForm = catchAsync(async (req, res) => {
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com",
    )
    .render('signup', {
      title: 'sign-up your account',
    });
});

exports.getAccount = catchAsync(async (req, res) => {
  res.status(200).render('account', {
    title: 'Your account',
  });
});

exports.getMyTours = catchAsync(async (req, res, next) => {
  //1) Find all bookings
  const bookings = await Booking.find({ user: req.user.id });
  //2) Find tours with the return  IDs
  const tourIDs = bookings.map((el) => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIDs } });
  res.status(200).render('overview', {
    title: 'My Tours',
    tours,
  });
});
exports.updateUserData = catchAsync(async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    },
  );
  res.status(200).render('account', {
    title: 'Your account',
    user: updatedUser,
  });
});

exports.alerts = (req, res, next) => {
  const { alert } = req.query;
  if (alert === 'booking')
    res.locals.alert =
      "Your booking was successful ! Please check your email for a confirmation. If your  doesn't show up here immediately , please come back later. ";
  next();
};


exports.forgotPassword =(req ,res ,next) => {
res.status(200).render('forgotpassword', {
  title: 'Forgot-Password',
});
};

exports.resetPassword = (req, res, next) => {
  res.status(200).render('resetpassword', {
    title: 'reset-Password',
  });
};
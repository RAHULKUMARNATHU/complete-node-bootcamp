const path = require('path');
const express = require('express');
const morgan = require('morgan');
const reteLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser')

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const viewRouter = require('./routes/viewRoutes');

const app = express();

/*setting template engine pug*/
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

/*Serving static files */
app.use(express.static(path.join(__dirname, 'public')));

/*Set Security HTTP headers */
app.use(helmet());

/*1) GLOBAL MIDDLEWARE */
/*Development Logging */
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

/*RATE LIMITER :- limit req. from same API */
const limiter = reteLimit({
  max: 100,
  windowMs: 60 * 60 * 1000 /*1 hr 100 req */,
  message: 'Too many requests from this IP , please try again in an hour',
});

app.use('/api', limiter);

/*Here express.json is middleware */
/*Body parser , reading data from body into req.body */
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser())


/*Data sanitization against NoSQL query injection */
app.use(mongoSanitize());

/*Data sanitization against xss */
app.use(xss());

/*Prevent parameter pollution */
app.use(
  hpp({
    whitelist: [
      'duration',
      'price',
      'ratingsQuantity',
      'ratingsAverage',
      'difficulty',
      'maxGroupSize',
    ],
  }),
);

/*Test  middleware*/
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.cookies);
  next();
});



/*Mounting the routes */

app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can not find ${req.originalUrl} on this server`,
  // });
  // const err = new Error(`Can't find ${req.originalUrl} on this server`);
  // err.status = 'fail';
  // err.statusCode = 404;
  // next(err);
  next(new AppError(`Can not find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;

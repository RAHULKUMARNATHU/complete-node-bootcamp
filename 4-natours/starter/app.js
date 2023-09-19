const express = require('express');
const morgan = require('morgan');

const app = express();

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

/*1) MIDDLEWARE */
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

/*Here express.json is middleware */
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('Hello from the middleware 👋');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .json({ message: 'Hello  from the server side! ', app: 'Natours' });
// });

// app.post('/', (req, res) => {
//   res.status(201).json({ message: 'You can post this endpoint ' });
// });

/*3) ROUTES */
// app.get('/api/v1/tours', getAllTours);

// app.get('/api/v1/tours/:id', getTour);

// app.post('/api/v1/tour', createTour);

/*Mounting the routes */

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;

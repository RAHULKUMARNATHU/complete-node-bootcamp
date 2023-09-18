const fs = require('fs'); /*Core module */
const express = require('express');
const morgan = require('morgan');

const app = express();

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

/*1) MIDDLEWARE */
app.use(morgan('dev'));

/*Here express.json is middleware */
app.use(express.json());

const port = 3000;

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
/*4) START SERVER */
app.listen(port, () => {
  console.log(`App Running on port ${port}...`);
});

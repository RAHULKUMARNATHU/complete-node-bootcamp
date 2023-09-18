const fs = require('fs'); /*Core module */
const express = require('express');
 const morgan = require('morgan')

const app = express();


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

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
); /*JSON.parse ----> converts into javascript object */


/*2) ROUTE HANDLER */
/*getAll tours */
const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

/*get tour by id */

const getTour = (req, res) => {
  const id = req.params.id * 1;
  // if(id > tours.length){
  //   return res.status(404).json({
  //     status:'failed',
  //     message:'Invalid Id'
  //   })
  // }
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid Id',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

/*create tour */
const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;

  newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 201,
        data: {
          tour: newTour,
        },
      });
    }
  );
};

/*3) ROUTES */
// app.get('/api/v1/tours', getAllTours);

// app.get('/api/v1/tours/:id', getTour);

// app.post('/api/v1/tour', createTour);


app.route('/api/v1/tours/').get(getAllTours).post(createTour);

app.route('/api/v1/tours/:id').get(getTour);

/*4) START SERVER */
app.listen(port, () => {
  console.log(`App Running on port ${port}...`);
});

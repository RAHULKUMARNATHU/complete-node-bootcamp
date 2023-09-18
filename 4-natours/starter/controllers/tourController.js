const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}./../dev-data/data/tours-simple.json`)
); /*JSON.parse ----> converts into javascript object */

/*2) ROUTE HANDLER */

exports.checkID = (req, res, next, val) => {
  console.log(`Tour id is : ${val}`);

  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid Id',
    });
  }
  next();
};

/*Check body */

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(500).json({
      status: 'failed',
      message: 'price or name missing',
    });
  }
  next();
};
/*getAll tours */

exports.getAllTours = (req, res) => {
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

exports.getTour = (req, res) => {
  const id = req.params.id * 1;
  // if(id > tours.length){
  //   return res.status(404).json({
  //     status:'failed',
  //     message:'Invalid Id'
  //   })
  // }
  const tour = tours.find((el) => el.id === id);
  //   if (!tour) {
  //     return res.status(404).json({
  //       status: 'failed',
  //       message: 'Invalid Id',
  //     });
  //   }
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

/*create tour */
exports.createTour = (req, res) => {
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

/*Update tour */
exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: `Tour updated successfully`,
    },
  });
};

/*Delete Tour */
exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: `Tour deleted successfully`,
    },
  });
};

const app = require('./app');

const port = 3000;

/*4) START SERVER */
app.listen(port, () => {
  console.log(`App Running on port ${port}...`);
});

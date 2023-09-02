const EventEmitter = require("events");
const http = require('http');

// const myEmitter = new EventEmitter();

class Sales extends EventEmitter {
  /*constructor automatically executes when object creates */
  constructor() {
    super(); /*always have to do when we extends a super class */
  }
}

myEmitter = new Sales();

/*These are observers */
myEmitter.on("newSale", () => {
  console.log("There was a new sale! ");
});

myEmitter.on("newSale", () => {
  console.log("Customer name jonas");
});

myEmitter.on("newSale", (stock) => {
  console.log(`There are now ${stock} item left in stock`);
});

/*Object that emits */
myEmitter.emit("newSale", 9);



/**_______________________________________________**/

const server = http.createServer();

/*if we listen some event then we use .on */
server.on('request' , (req , res) => {
    console.log(req.url);
    console.log('Request Received! ' );
    res.end("Request Received!");

});

server.on("request", (req, res) => {
  console.log("Another Request Received! ");
//   res.end("ANother Request Received!");
});


server.on('close' , () => {
    console.log('server closed');
}) ;

server.listen(8000 , '127.0.0.1' , () => {
    console.log('Waiting for requests ...');
})
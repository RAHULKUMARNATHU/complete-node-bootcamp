/*Used to process (read and write ) data piece by piece (chunks ) ,
 without completing the whole read or write operation ,
and therefore without keeping all the data in memory  */

const fs = require("fs");
const http = require("http");

const server = http.createServer();

server.on("request", (req, res) => {
  /*Solution 1 */
  //   fs.readFile("test-file.txt", (err, data) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     res.end(data);
  //   });

  /*Solution 2 */
  // const readable = fs.createReadStream('test-file.txt') ;
  // readable.on('data' , chunk => {
  //     res.write(chunk);
  // });

  // readable.on('end'  , ()=> {
  //     res.end();
  // });

  // readable.on('error' , error => {
  //     console.log(error);
  //     res.statusCode = 500 ;
  //     res.end('File not found!')
  // });

  /*Solution 3 */
  const readable = fs.createReadStream("test-file.txt");
  readable.pipe(res);

  //readableSource.pipe(writeableDest)
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening....");
});

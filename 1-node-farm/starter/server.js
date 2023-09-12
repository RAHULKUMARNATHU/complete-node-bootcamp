const http = require("http");
const fs = require("fs");
const url = require('url');
const slugify =  require('slugify');

const replaceTemplate = require('./module/replaceTemplate')


const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
  );
  const tempCard = fs.readFileSync(
    `${__dirname}/templates/template-card.html`,
    "utf-8"
    );
    const tempProduct = fs.readFileSync(
      `${__dirname}/templates/template-product.html`,
      "utf-8"
      );
      
      const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
      const dataObj = JSON.parse(data);
      const slugs = dataObj.map(el => slugify(el.productName , {lower : true} ))
      console.log(slugs);
      
const server = http.createServer((req, res) => {
  const {pathname , query} = url.parse(req.url,true);
  /*Overview Page */
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });
    const cardHtml = dataObj
      .map((ele) => replaceTemplate(tempCard, ele))
      .join("");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardHtml);
    res.end(output);
  } else if (pathname === "/product") {
    /*Product page */
    res.writeHead(200, { "Content-type": "text/html" });
    const product = dataObj[query.id];
    const output =  replaceTemplate(tempProduct , product);
    res.end(output);
  } else if (pathname === "/api") {
    /*API */
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end(`<h1>Page not Found </h1>`);
  }
});

server.listen(8000, "localhost", () => {
  console.log(`Server is running `);
});

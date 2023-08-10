const http = require('http');
// const url = require('url')


const server = http.createServer((req ,res) => {
    const pathName = req.url ;

    if(pathName === '/' || pathName === '/overview'){
        res.end('hello from overview')
    }
    else{
        res.writeHead( 404, {
            'Content-type':'text/html',
            'my-own-header':'hello-world'
        });
        res.end(`<h1>Page not Found </h1>`);
    }
});

server.listen(8000 , 'localhost' , () => {
    console.log(`Server is running `);
})
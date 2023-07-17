/*create server*/
const http = require('http');
const fs = require('fs');
const server = http.createServer((req,res) => {
    console.log(req.url,req.method,req.headers);
     /*event loop close incoming req*/
    // process.exit();

/* routing request */
const url = req.url;
const method = req.method;
if(url === '/'){
    res.write('<html>');
    res.write('<head><title>Eneter Message</title></head>');
    res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button>Send</button></form></body>');
   return res.end();  
}
/*Redirecting Request*/
if(url == '/message' && method === 'POST'){
    /*Parsing request body */
    const body = [];
    req.on('data', (chunk) => {
        console.log(chunk);
        body.push(chunk);
    });

    //event driven code execution
    return req.on('end', () =>{
        const parseBody = Buffer.concat(body).toString();
        const message = parseBody.split('=')[1];
        fs.writeFileSync('hello.txt',message);
         // fs.writeFileSync('message.txt', 'Hello');
    res.statusCode = 302;
    res.setHeader('Location','/');
    return res.end();
    });
   
}
/*sending response*/
    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title>node js</title></head>');
    res.write('<body><h1>hello this is node js lessons</h1></body>');
    res.end();




});


server.listen(3000);
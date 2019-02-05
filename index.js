const net = require("net");
const fs = require("fs");

const port = process.argv[2];
const outputFile = process.argv[3];
const responseFile = process.argv[4];
var responseContent = "";
var contentLength = 0;

console.log(`Log http request incoming into port: ${port} to file ${outputFile}`);

net.createServer(socket =>
  socket.on('data', data => {
    console.log("Request:\n");
    console.log(data.toString());

    if(outputFile !== undefined) {
      fs.appendFileSync(outputFile, data);
    }

    if(responseFile !== undefined) {
      responseContent = fs.readFileSync(responseFile);
      contentLength = responseContent.length;
    }

    socket.write(`HTTP/1.1 200 OK\r\nContent-Type: text/html; charset=UTF-8\r\nContent-Encoding: UTF-8\r\nContent-Length: ${contentLength}\r\nAccept-Ranges: bytes\r\nConnection: close\r\n\n${responseContent}\r\n\n`);
    socket.end()
  })).
  listen(port, '0.0.0.0');

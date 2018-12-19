var net = require("net");

const port = process.argv[2];

console.log(`Log http request incoming into port: ${port}`);

net.createServer(socket =>
  socket.on('data', data => {
    console.log("Request:\n");
    console.log(data.toString());
    socket.write([
      'HTTP/1.1 200 OK',
      'Content-Type: text/html; charset=UTF-8',
      'Content-Encoding: UTF-8',
      'Accept-Ranges: bytes',
      'Connection: keep-alive',
    ].join('\n'));
    socket.end();
  })).
  listen(port, '0.0.0.0');

var fs = require('fs');
var file = fs.createWriteStream('test2.mp3', { encoding: 'binary' });
var net = require('net');
var HOST = '127.0.0.1';
var PORT = 8877;

var server = net.createServer();

server.on('listening', function(){
  console.log('Server is listening on port', PORT);
  var addr = server.address();
  console.log('%j', addr);
});

server.on('connection', function(socket){
  console.log('Server has a new connection');
  console.log(socket.address());
  console.log(socket.localAddress);
  console.log(socket.localPort);
  console.log('client IP：' + socket.remoteAddress);
  console.log('client PORT：' + socket.remotePort);
  //data event
  socket.on('data', function(data){
    //data.pipe(file);
    console.info('data is %b', data);
    console.info('socket.bytesRead is ' + socket.bytesRead);
  });
});

server.on('close', function(){
  console.log('Server is now closed');
});

server.listen(PORT, HOST);

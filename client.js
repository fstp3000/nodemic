var record = require('node-record-lpcm16');
var speaker = require('audio-sink');
var net = require('net');
var HOST = '127.0.0.1';
var PORT = 8877;

var client = net.connect(PORT, HOST, function(){
  console.log('Try to connect…');
});
var re = record.start({
                       sampleRate : 41000,
                       verbose : true
                        })
re.pipe(client);

client.on('data', function(data){
  console.log(data.toString());
  console.log('socket.bytesRead is ' + client.bytesRead);
  client.end();
});

client.on('end', function(){
  console.log('client disconnected');
});

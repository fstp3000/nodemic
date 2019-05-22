var record = require('node-record-lpcm16');
var fs = require('fs')
var speaker = require('audio-sink') 
var file = fs.createWriteStream('test.mp3', { encoding: 'binary' })
 

var http=require('http')
var fs=require('fs')
var file = fs.createWriteStream('test.mp3')
//var file = fs.createWriteStream('test.mp3', { encoding: 'binary' })
var flag = 0;
http.createServer((req,res)=>{
	if (flag==0){
		flag = 1;
		var re = record.start({
				sampleRate : 41000,
				verbose : true
			})
		re.pipe(file);
	}
	//re.pipe(res);
	//res.writeHead(200,{
	//	'Content-Type':'audio/mpeg',
		//'Content-Length':stat.size
	//	})
	res.writeHead(200, {"Content-Type": "text/plain"});
  	res.write("Hello World");
  	res.end();
}).listen(3000)
console.log('Server is running at 127.0.0.1:3000')

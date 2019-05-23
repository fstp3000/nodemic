var net = require('net'); // 引入網路 (Net) 模組
var HOST = '127.0.0.1';
var PORT = 8877;

// 使用 net.connect() 方法，建立一個 TCP 用戶端 instance
var client = net.connect(PORT, HOST, function(){
  console.log('客戶端連線…');

  // 向伺服器端發送資料，該方法其實就是 socket.write() 方法，因為 client 參數就是一個通訊端的物件
  client.write('client write: 哈囉 Server!');
  client.end();
});

// data 事件
client.on('data', function(data){
  console.log(data.toString());

  // 輸出由 client 端發來的資料位元組長度
  console.log('socket.bytesRead is ' + client.bytesRead);

  // 在列印輸出資料後，執行關閉用戶端的操作，其實就是 socket.end() 方法
  client.end();
});

// end 事件
client.on('end', function(){
  console.log('client disconnected');
});

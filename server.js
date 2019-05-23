var net = require('net'); // 引入網路(Net)模組
var HOST = '127.0.0.1'; // 定義伺服器位址
var PORT = 8877; // 定義 Port

// 使用 net.ServerClient() 方法建立一個 TCP 伺服器
// 傳入 net.ServerClient() 的 callback 將作為 connection 事件的處理函數
var server = net.createServer();

// 監聽 listening 事件
server.on('listening', function(){
  console.log('Server is listening on port', PORT);

  // 如需 IP 位址等資訊，可藉由以下方式來取得
  var addr = server.address();
  console.log('%j', addr); // {"address":"127.0.0.1","family":"IPv4","port":8877}
});
// 監聽 connection 事件
var bSockData = true;
server.on('connection', function(socket){
  console.log('Server has a new connection');
  console.log('bSockData 的值：' + bSockData);
  if(bSockData){
    socket.resume(); // 恢復通訊端(socket) data 事件
    bSockData = false;
  }else{
    socket.pause(); // 暫停通訊端(socket) data 事件
    bSockData = true;
  }
  console.log(socket.address()); // 此方法與 server.address() 得到的結果會是一致的，因為 socket.address() 方法鎖定的就是伺服器的 IP 位址
  console.log(socket.localAddress); // 取得 server 的 IP：127.0.0.1
  console.log(socket.localPort); // 取得 server 的 PORT：8877
  console.log('client 端的 IP：' + socket.remoteAddress); // client 端的 IP：127.0.0.1
  console.log('client 端的 PORT：' + socket.remotePort); // client 端的 PORT：61929

  socket.on('data', function(data){

    if(socket.bytesRead > 32){
      console.info('DATA ' + socket.remoteAddress + ' : "' + 'is too long!' + '"');
    }else{
      console.info('DATA ' + socket.remoteAddress + ' : "' + data + '"');
    }

    // 輸出由 client 端發來的資料位元組長度
    console.info('socket.bytesRead is ' + socket.bytesRead);
    console.info('DATA ' + socket.remoteAddress + ' : "' + data + '"');

    // 回發資料，用戶端將收到來自服務端的資料
    socket.write('Server write: "' + data + '"');
    // 輸出回發到用戶端的資料位元組長度
    console.info('socket.bytesWritten is ' + socket.bytesWritten);
  });

  server.close(); // 會觸發 close 方法，客戶端使用 client.end() 之後，才會呼叫。
});

// 監聽 close 事件
server.on('close', function(){
  console.log('Server is now closed');
});

// 監聽指定的 Port
server.listen(PORT, HOST); // 會觸發 listening 方法

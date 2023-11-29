const express =require('express');
const server = require('http').createServer();
const app =express();

app.get('/',function(req,res){
    res.sendFile('index.html',{root: __dirname});

})

server.on('request',app);
server.listen(3000, function(){
    console.log("server started on port 3000");
});

// Begin WebSockets

const WebSocketServer = require('ws').Server;

const wss = new WebSocketServer({server: server});

wss.on('connection', function connection(ws){
    const numCLient= wss.clients.size;
    console.log('Clients connected', numCLient);

    wss.broadcast(`Current visitors: ${numCLient}`)
    if (ws.readyState === wss.OPEN){
        ws.send('welcome to my server')
    }
    ws.on('close', function close(){
        wss.broadcast(`Current visitors: ${numCLient}`)
        console.log('A client has disconnected');
    });

});
wss.broadcast = function broadcast(data){
    wss.clients.forEach(function each(client){
        client.send(data);
    })
}
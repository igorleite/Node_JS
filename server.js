
var webSocketServer = require('websocket').server;
var http = require('http');
var blinky = require('./gaa');

    

"use strict";

process.title = 'ServidorArduino';

// porta do servidor websocket
var webSocketsServerPort = 1337;

/**
 * Servidor HTTP
 */
var server = http.createServer(function(request, response) {});


server.listen(webSocketsServerPort, function() {
    console.log((new Date()) + " Server is listening on port " + webSocketsServerPort);
});

/**
 * Servidor Websocket
 */
var wsServer = new webSocketServer({
    httpServer: server
});

// Função de callback disparada quando alguem tenta se conectar ao servidor
wsServer.on('request', function(request) {
    console.log((new Date()) + ' Connection from origin ' + request.origin + '.');
    
    //conexão aceita
    var connection = request.accept(null, request.origin); 
    console.log((new Date()) + ' Connection accepted.');


    //callback disparado quando mensagem for recebida
    connection.on('message', function(message) {
        if (message.type === 'utf8') { //verifica se é um texto
           
            if(message.utf8Data=='0') {
                
                var blinky = require('./gaa');console.log("Ligando LED");
                board.ledOn(13);
                connection.sendUTF("Comando recebido pelo servidor, LED ligado");
            }

            else if(message.utf8Data=="1") {
                
                console.log("desligando LED");
                board.ledOff(13);
                connection.sendUTF("Comando recebido pelo servidor, LED desligado");
            }

            else if(message.utf8Data=="2") {
                
                console.log("Enviando temperatura");
                connection.sendUTF("Comando recebido pelo servidor. A temperatura é: " + board.getTemp());
            }
            
            //console.log((new Date()) + ' Received Message' + ': ' + message.utf8Data);
                   
            }

    });

    // fim da conexão
    connection.on('close', function(connection) {

    });

});

$(function () {
"use strict";
 

var content = $('#content');
var input = $('#input');
var status = $('#status');
var id = $('#id');
 

window.WebSocket = window.WebSocket || window.MozWebSocket;
 
// verifica se o navegador suporta websocketws
if (!window.WebSocket) {
content.html($('<p>', { text: 'Sorry, but your browser doesn\'t '
+ 'support WebSockets.'} ));
input.hide();
$('span').hide();
return;
}
 
// open connection
var connection = new WebSocket('ws://localhost:1337'); //IP do servidor
 
connection.onopen = function () {
	input.removeAttr('disabled');
	status.text('digite o comando:')
};
 
connection.onerror = function (error) {
// em caso de problemas com a conexão
content.html($('<p>', { text: 'Problemas com a conexão, ou o servidor nao esta ativo' } ));
};

connection.onmessage = function (message) {
	
	addMessage(message.data);
	input.removeAttr('disabled');
};
 
/**
* Send mesage when user presses Enter key
*/
input.keydown(function(e) {
	
	if (e.keyCode === 13) {
	var msg = $(this).val();
	if (!msg) {
		return;
	}
	// send the message as an ordinary text
	connection.send(msg);
	$(this).val('');

	// disable the input field to make the user wait until server
	// sends back response
	input.attr('disabled', 'disabled');
 	
	}
});
 
id.click(function(e) {
	var msg = $(this).val();
	if (msg == 1){
		connection.send(msg);
		$(this).val('0');
	}else{
		connection.send(msg);
		$(this).val('1');
	}
});

/**
* Add message to the chat window
*/
function addMessage(message) {
	content.prepend('<p>' + message + '</p><br>');
	}
});

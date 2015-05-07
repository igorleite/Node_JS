var j5 = require("johnny-five");

var OUTPUT = 1;
var analogPin = j5.Pin.ANALOG;


var ArduinoFirmata = require('arduino-firmata');
board = new ArduinoFirmata();

//board.connect(); // use default arduino
board.connect('/dev/cu.usbmodem1421');


board.ledOn = function(pino) {
    this.digitalWrite(pino, 1);
}

board.ledOff = function(pino) {
    this.digitalWrite(pino, 0);
}


board.getTemp = function() {

    this.pinMode(0, analogPin);
    var temp = ((this.analogRead(0) - 30) / 1.5) + 10;
    return temp;

}


board.on('connect', function(){

  console.log("board version "+board.boardVersion);
  // your-code-here


});
	

var sensor = require('ds18x20');
var wpi = require('wiring-pi');

class SensorWrapper {
    constructor() {
        this.inputs = [{
            pin: '11',
            gpio: '17',
            value: 1
        }, {
            pin: '12',
            gpio: '18',
            value: 0
        }];
        
        // init sensor lib
        var isLoaded = sensor.isDriverLoaded();
        console.log(isLoaded);
        
        // init wpi lib
        wpi.setup('wpi');
    }

    readTemperature() {
        var listOfDeviceIds = sensor.list();
        console.log(listOfDeviceIds);

        var tempObj = sensor.getAll();
        console.log(tempObj);
    }

    testBlinkLED() {
        // GPIO pin of the led
        var pin = 16;
        var delay = 2000;
        var isLedOn = 0;
        wpi.pinMode(pin, wpi.OUTPUT);

        setInterval(function() {
            isLedOn = +!isLedOn;
            console.log(isLedOn);
            wpi.digitalWrite(pin, isLedOn);
        }, delay);
    }
    
    testReadAllPins() {
        for(let i=0; i<32; i++) {
            wpi.pinMode(i, wpi.INPUT);
            console.log('pin ' + i + ' : ' + wpi.digitalRead(i));
        }
    }
}

module.exports = SensorWrapper;

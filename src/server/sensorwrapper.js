let sensor = require('ds18x20');
let wpi = require('wiring-pi');

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
        let isLoaded = sensor.isDriverLoaded();
        console.log(isLoaded);

        // init wpi lib
        wpi.setup('wpi');
    }

    /**
     * OK works
     * */
    readAllTemperature() {
        let listOfDeviceIds = sensor.list();
        console.log(listOfDeviceIds);

        let tempObj = sensor.getAll();
        console.log(tempObj);
    }
    
    readTemperature() {
        let sensor_id = '28-041661cc1aff';
        let temp = sensor.get(sensor_id);
        return temp;
    }

    /**
     * 
     * */
    testBlinkAllLED() {
        // GPIO pin of the led
        let delay = 2000;
        let isLedOn = 0;

        setInterval(function() {
            isLedOn = +!isLedOn;
            (isLedOn) ? console.log('pling'): console.log('plong');
            for (let i = 0; i < 32; i++) {
                wpi.pinMode(i, wpi.OUTPUT);
                wpi.digitalWrite(i, isLedOn);
            }
        }, delay);
    }

    testBlinkLED(i = 23) {
        // GPIO pin of the led
        let delay = 200;
        let isLedOn = 0;
        console.log('blinking on pin ' + i)

        setInterval(function() {
            isLedOn = +!isLedOn;
            wpi.pinMode(i, wpi.OUTPUT);
            wpi.digitalWrite(i, isLedOn);
        }, delay);
    }

    blink(i = 23) {
        console.log('blinking on pin ' + i);
        let delay = 200;
        // on 
        wpi.pinMode(i, wpi.OUTPUT);
        wpi.digitalWrite(i, 1);

        // off
        setTimeout(function() {
            wpi.digitalWrite(i, 0);
        }, delay);
    }

    blinkXTimes(delay, repetitions, pin) {
        let x = 0;
        let intervalID = setInterval(() => {
            this.blink(pin);
            if (++x >= repetitions) {
                clearInterval(intervalID);
            }
        }, delay);
    }

    testBlinkAllLEDXTimes() {
        for (let i = 0; i < 32; i++) {
            this.blinkXTimes(400, i, i);
        }
    }

    /**
     * OK seems to work
     * */
    testReadAllPins() {
        for (let i = 0; i < 32; i++) {
            wpi.pinMode(i, wpi.INPUT);
            console.log('pin ' + i + ' : ' + wpi.digitalRead(i));
        }
    }
}

module.exports = SensorWrapper;

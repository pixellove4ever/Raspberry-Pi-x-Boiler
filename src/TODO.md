## installer node
curl -sLS https://apt.adafruit.com/add | sudo bash
( curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash - )
sudo apt-get install node
node -v

## GPIO :
http://webofthings.org/2016/10/23/node-gpio-and-the-raspberry-pi/
https://www.npmjs.com/package/rpi-gpio 
VS 
http://johnny-five.io/api/board/ + https://github.com/nebrius/raspi-io
a voir : 
https://www.sitepoint.com/getting-started-with-the-raspberry-pi-gpio-pins-in-node-js/
https://github.com/keithpops/jeoparty

## REST : 
http://www.robert-drummond.com/2013/05/08/how-to-build-a-restful-web-api-on-a-raspberry-pi-in-javascript-2/

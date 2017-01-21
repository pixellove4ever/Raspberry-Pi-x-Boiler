//includes
var express = require('express');
var wpi = require('wiring-pi');	
var fs = require('fs');

//initialisation du serveur web, des chemins locaux et du socket
var app = express();
app.engine('.html',require('ejs').__express);
app.set('views',__dirname + '/templates');
app.use('/jquery',express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/socketio',express.static(__dirname + '/node_modules/socket.io/node_modules/socket.io-client/'));
app.use('/public',express.static(__dirname +  '/public/'));
var httpserver = require('http').createServer(app);
var socketio = require('socket.io').listen(httpserver);

//numerotage des 'pin' suivant GPIO
wpi.setup('gpio');

//lecture du fichier de config
var config = JSON.parse(fs.readFileSync('config.json'));

//initialisation des périphériques
for (var i = 0;i < config.perif.length;i++)
{   
	wpi.pinMode(config.perif[i].out,wpi.OUTPUT);
	wpi.pinMode(config.perif[i].inp,wpi.INPUT);
	wpi.pullUpDnControl(config.perif[i].inp,wpi.PUD_UP);
		
	//positionement de la property etat du perif
	config.perif[i].etat= wpi.digitalRead(config.perif[i].out);	
		
	//abonnement aux interupt. front descendant sur les inputs
	wpi.wiringPiISR(config.perif[i].inp,wpi.INT_EDGE_FALLING,function()
	{
		for (var i = 0;i < config.perif.length;i++)
		{//recherche le l'input à low
			if (wpi.digitalRead(config.perif[i].inp) == 0)
			{
				//appel de changement d'etat de l'output
				changeGPIO(config.perif[i].iden);					
			}
		}
	});			
}
			
//Route de distribution de la page web par defaut
app.get('/',function(req,res){
	res.render('index.html');
});

//Route qui retourner les paramètres et leurs état 
//au format Json (pas utile ici, mais c'est cadeau)
app.get('/perif',function(req,res){
		res.json(config.perif);
});

//socketio à ecoute
socketio.sockets.on('connection',function(client){
	 
	 //fourni la configuration au client qui se connecte
	 client.emit('connected',{config : config}); 	 
	 
	 //recoit une demande de changement du client	
	 client.on('perifchange',function(data)
	 {	 
		 //appel de changement d'etat de l'output
		 changeGPIO(data.iden);		 		 
	 });
});

//change l'etat de la sortie du perif i
function changeGPIO(i)
{
	var s = wpi.digitalRead(config.perif[i].out);
	if (s == 1){s = 0;}else{s = 1;}
	wpi.digitalWrite(config.perif[i].out,s);
	//met a jour la property etat du perif
	config.perif[i].etat = s;
	//broadcast le status du perif à tous les clients
	var data = {'etat' : s,'iden': i }; 
	socketio.sockets.emit('perifchange',data); 
	//monitoring dans la console pour faire joli
	console.log(new Date().toLocaleString() + ' : ' + config.perif[i].name + ' is set to ' + s);
}

//demarre le serveur web
httpserver.listen(8080);

console.log ('CTRL+C pour quitter');



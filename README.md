# Raspberry-Pi-x-Boiler
Control your boiler from anywhere with an Rpi Zero

Le but du jeu est de controler sa chaudière avec un Raspberry Pi Zéro.
Une interface web contolera le tout.
La chaudière en question est une e.l.m leblanc acleis nglm 24-6h

On utilise (pour le moment) screen (https://doc.ubuntu-fr.org/screen) pour garder le serveur ouvert quand on ferme la session.
Quelques commandes :
- Lancer une session : ```screen```
- Lister les sessions: ```screen -list```
- Fermer toutes les sessions detachées : ```screen -ls | grep Detached | cut -d. -f1 | awk '{print $1}' | xargs kill```
- Detacher une session: CTRL + A puis appuyer sur D
- Fermer une session : ```exit```
- Attacher une session : ```screen -r (+nom session)```

Utilisation de cloud9 pour avoir une webIde (https://c9.io/)
Installation depuis https://github.com/chintanp/Cloud9-on-RPi, merci à chintanp

Commande pour lancer le serveur ```./server.js -l 0.0.0.0 -a : -w ~``` dans "/cloud9/node_modules/c9sdk "

Lancement du serveur ```<bash>node server.js``` dans "/dev/Raspberry-Pi-x-Boiler/src/server"

Pour lancer les serveur au demarage du système, on utilise CRON. Une fois lancer cron, ```crontab -e```, inserer les lignes suivantes:
```
@reboot /usr/local/bin/node /home/pi/cloud9/node_modules/c9sdk/server.js -l 0.0.0.0 -a : -w ~ & 
@reboot /usr/local/bin/node /home/pi/dev/Raspberry-Pi-x-Boiler/src/server/server.js &
```

Pour la lecture de la temperature via une sonde DS18B20 il faut ajouter:
```
w1-gpio
w1-therm
```
dans /etc/modules et 
```
dtoverlay=w1-gpio, gpiopin=4
```
dans le fichier /boot/config.txt. gpiopin = 4 correspond au nom du GPIO sur lequel le fil data de la sonde est connecté.

Ensuite, pour lire la valeur retournée par le thermomètre, il faut d'abord trouvé l'identifiant de la led
```
ls /sys/bus/w1/devices/
```
Normalement, le terminal devrait lister le thermomètre. Ici, l'identifiant de notre thermomètre est 28-041661cc1aff. Il est unique, chaque thermomètre a le sien. Enfin, on lit la température:

```
more /sys/bus/w1/devices/28-041661cc1aff/w1_slave
```
La lecture retourne quelque chose du type
```
t=18437
```
Ca correspond à une temperature de 18,437°C

Pour activer une led (et donc plus tard controler le relai de la chaudière) on fait:
```
cd /sys/class/gpio/
echo "23" > export
cd gpio23
echo "out" > direction
echo "1" > value
```

Le numéro du GPIO correspond au nom du GPIO, pas le numéro de la pin.
Pour eteindre :

```
echo "0" > value
cd ..
echo "23" > unexport
```

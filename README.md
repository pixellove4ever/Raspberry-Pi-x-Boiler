# Raspberry-Pi-x-Boiler
Control your boiler from anywhere with an Rpi Zero

Le but du jeu est de controler sa chaudière avec un Raspberry Pi Zéro.
Une interface web contolera le tout.
La chaudière en question est une e.l.m leblanc acleis nglm 24-6h

On utilise (pour le moment) screen (https://doc.ubuntu-fr.org/screen) pour garder le serveur ouvert quand on ferme la session.
Quelques commandes :
- Lancer une session : screen
- Lister les sessions: screen -list
- Fermer toutes les sessions detachées : screen -ls | grep Detached | cut -d. -f1 | awk '{print $1}' | xargs kill
- Detacher une session: CTRL + A puis appuyer sur D
- Fermer une session : exit
- Attacher une session : screen -r (+nom session)


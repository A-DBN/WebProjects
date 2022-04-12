[![ForTheBadge winter-is-coming](http://ForTheBadge.com/images/badges/winter-is-coming.svg)](http://ForTheBadge.com)

# Redditech

Projet [EPITECH](https://www.youtube.com/watch?v=dQw4w9WgXcQ) par ***Jules Vitrac*** et ***Antoine Dabin***

![Markdown Logo](https://www.epitech.eu/fr/wp-content/uploads/2021/09/logo-epitech-technology-hp.png)

## **Objectif du projet**

Recréer [Reddit](https://www.reddit.com/)

![Markdown Logo](https://icons.iconarchive.com/icons/papirus-team/papirus-apps/256/reddit-icon.png)
### _**Fonctionnalités demandées**_
- [x] Se connecter à l'API [Reddit](https://www.reddit.com/) avec le protocol OAuth2
- [x] Afficher les informations de l'utilisateur
- [x] Afficher les posts venant des subreddit auxquels l'utilisé est abonné
- [ ] Filtrer the posts
- [ ] Chercher des subreddits
- [ ] Afficher les informations d'un subreddit
- [ ] Afficher les posts d'un subreddit
- [ ] S'abonner/désabonner d'un subreddit
- [x] Afficher au moins 6 parametres de l'utilisateur
- [x] Etre capable de modifier au moins 6 parametres de l'utilisateur
  
## **Lancement de l'application**

Première solution: 
- ```./start.sh chrome``` 
- ```./start.sh emu```
  - Cette partie exécute flutter devices et lance l'application avec le premier emulator indiqué
  
Deuxième Solution (à la main):
- Accéder aux appareils liés
  - ```flutter devices```
- Utiliser l'appareil
  - ```flutter run -d <nom de l'émulateur>```

## **Connexion à l'application**

La connexion se fait en s'appuyant sur le bouton login en bas de la page d'accueil.
La page web de connexion a reddit s'ouvrira et demandera de se connecter

## **Fonctionnalités implémentées**

- Se connecter à l'API [Reddit](https://www.reddit.com/) avec le protocol OAuth2
- Afficher les informations de l'utilisateur
  - Nom d'utilisateur
  - Photo de profil
  - Karma
  - Description
- Afficher les posts venant des subreddit auxquels l'utilisé est abonné
- Afficher au moins 6 parametres de l'utilisateur
  - Lecture Automatique des vidéo 
  - Avertir si le post contient du contenu NSFW
  - Avertir si le post contient du contenu 18+
  - Masquer les pubs
  - Passer en mode sombre
  - Permettre aux utilisateurs de suivre ce compte   
- Etre capable de modifier au moins 6 parametres de l'utilisateur
  - cf . Afficher au moins 6 parametres
  
## Problèmes possibles
- Si les posts ne chargent pas sur la page d'acceuil
  - Appuyer sur le menu home en bas a gauche de la barre de navigation pour refresh la page
- Les images ne chargent pas
  - Cette erreur vient des informations fournies par l'API reddit sur les posts

# Area

Projet [Epitech](https://www.youtube.com/watch?v=XTKZiE1l1yU) par ***Jules Vitrac***, ***Hugo Mondou***, ***Alexis Roye***, ***Stephane Ganivet*** et ***Antoine Dabin***

![Markdown Logo](https://www.epitech.eu/fr/wp-content/uploads/2021/09/logo-epitech-technology-hp.png)

## **Objectif du projet**

Créer un Dashboard avec des services proposant des actions et des réactions automatiques (Ex: [IFTTT](https://ifttt.com/))

Projet réalisé en ***React.js*** pour la partie web, ***React Native*** pour l'application mobile et ***Node.js*** avec ***Docker*** et ***Firebase*** pour le serveur

## Indication du projet

Le frontend est disponible à l'adresse:
- ``` localhost:8081 ```

Le backend est disponible à l'adresse:
- ```localhost:8080```

A l'inscription d'un service, les données sont pré-remplies. Il faut donc attendre une update pour recevoir les premiers mails pour ce service.

### _**Fonctionnalités demandées**_
- [x] Système d'authentification
- [x] Système de gestion des utilisateurs
- [x] Abonnement à un service
- [x] Gestion de Widgets liés a un service
- [x] Définir 15 actions liées a des services (3 x Nb personne dans le groupe)
- [x] Définir des réactions liées aux actions faites ci-dessus

### Restrictions du sujet

X => Nombre de personne dans le groupe

- [x] Avoir au moins 1 + X service => 6
- [x] Avoir au moins 3 * X widgets => 15

## Authentification

### Méthodes d'authentification
- [x] Authentification par email/password
- [x] Authentification par Oauth2
    - Google
    - Github
    - Microsoft

## Services et Widgets

### Services et actions disponibles

- [Epitech Intra](#EpitechIntra)
    - Actions
        - Changement du nombre de crédits (credits)
        - Changement du GPA (gpa)
        - Temps de présence insuffisant (netsoul)
        - Nouvelle activité (new_activity)
    - Indications requises
        - Autologin
- [Youtube](#Youtube)
    - Actions
        - Nouvelle vidéo (new_video)
        - Milestone atteint (milestone)
    - Indications requises
        - Lien de la chaine
    - Restrictions
        - Certaines chaines ont un id spécifique empechant l'api de le trouver facilement
- [Twitch](#twitch)
    - Actions
        - Live en cours (live_on)
        - Milestone atteint (milestone)
    - Indications requises
        - Nom de la chaine
- [News](#news)
    - Actions
        - Nouvel article top tendance (new_news)
    - Indications requises
        - Domaine (ex: politique, agriculture ..)
- [Weather/Ip](#weather)
    - Actions
        - Changement de météo (weather_change)
        - Changement d'ip (ip_change)
    - Indications requises
        - Ville
- [Discord](#discord)
    - Actions
        - Utilisateur mentionné (new_mention)
    - Indications requises
        - Id utilisateur
        - Inviter le bot GenepiArea
        - Inviter le bot en ami ou autoriser les messages venant d'inconnu
- [Google](#google)
    - Actions
        - Traduction du texte indiqué (translate)
    - Indications requises
        - Texte a traduire
        - Langue de traduction
- [Covid](#covid)
    - Actions
        - Nouvelle données Covid (tracker)
    - Indications requises
        - Region voulu
- [Spotify](#spotify)
    - Actions
        - Nouvelle musique en #1 trend sur spotify (new_trend)
    - restrictions
        - Dû aux limitations de l'API Spotify, vous ne pouvez avoir qu'une instance de cette action active

## Lancer le projet
- ```cd client; yarn; cd ../mobile; yarn; cd ../server; yarn; cd ..```
- ```docker-compose build && docker-compose up```

## Telecharger l'apk
- Build l'apk:
    - ``` yarn install ```
    - ``` expo build:android -t apk ```
    Le build expo étant fait en ligne, il prend ~15 minutes à s'effectuer. Il est ensuite hébergé en ligne, le lien peut être trouvé avec un `expo build:status`. Il faut un compte Expo.

- Telecharger l'apk
    - ``` GET /client.apk ```
    - ```http://localhost:8081/client.apk```

## About
- ``` GET /about.json```

## Routes
- ``` GET /service/subscribe```
    - Paramètres obligatoires:
        - service: Le service voulu
        - uid: L'uid de l'utilisateur connecté
    - Paramètrs optionnels:
        - oauth_token: Oauth_token des services les nécessitants (intra)
        - city: Ville de l'utilisateur (weather)
        - domain: Sujet de news (news)
        - channel: Nom/URL de la chaine (twitch/youtube)
        - reg: Region de l'utilisateur (Covid)
        - user_id: Id discord de l'utilisateur (discord)

- ``` GET /service/unsubscribe```
    - Paramètres obligatoires:
        - service: Le service voulu
        - uid: L'uid de l'utilisateur connecté
 - ``` GET /area/subscribe ```
    - Paramètres obligatoires:
        - service: le service contenant l'action
        - action: le listener à activer
        - uid: L'uid de l'utilisateur connecté
- ``` GET /area/unsubscribe ```
    - Paramètres obligatoires:
        - service: le service contenant l'action
        - action: le listener à désactiver
        - uid: L'uid de l'utilisateur connecté

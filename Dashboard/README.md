# Dashboard

Projet [Epitech](https://www.youtube.com/watch?v=XTKZiE1l1yU) par ***Jules Vitrac*** et ***Antoine Dabin***

![Markdown Logo](https://www.epitech.eu/fr/wp-content/uploads/2021/09/logo-epitech-technology-hp.png)

## **Objectif du projet**

Créer un Dashboard comme [NetVibes](https://www.netvibes.com/en)

Projet réalisé en ***React.js*** et ***Node.js*** avec ***Docker*** et ***Firebase***

## Indication du projet

Le frontend est disponible aux adresses:
- ``` localhost:3000 ```
- ```https://epidashboard-332413.web.app/ ```

Le backend est disponible a l'adresse:
- ```localhost:8080```

### _**Fonctionnalités demandées**_
- [x] Système d'authentification
- [x] Système de gestion des utilisateurs
- [ ] Abonnement à un service
- [x] Gestion de Widgets liés a un service
- [ ] Un timer permettant de mettre à jour les widgets

### Restrictions du sujet

X => Nombre de personne dans le groupe

- [x] Avoir au moins 1 + X service => 3
- [x] Avoir au moins 3 * X widgets => 6

Un widget valide est un widget qui est parametrable et qui peut être présent 2 fois en même temps avec des informations différentes

## Authentification

### Méthodes d'authentification
- [x] Authentification par email/password
- [x] Authentification par Oauth2
    - Google
    - Github

## Services et Widgets

### Services disponibles

- [Github](#Github)
    - GetRepositories
- [Epitech Intra](#EpitechIntra)
    - GetUserInfos
- [Riot](#Riot)
    - GetChampions
    - GetItems
- [Weather](#Weather)
    - GetCurrent
    - GetForecast
    - GetIp
- [Youtube](#Youtube)
    - GetChannel
    - GetChannelVideos

## Lancer le projet

- ```docker-compose build && docker-compose up```

### Deploiement avec firebase (Si site off)
- ``` firebase init```
- ``` firebase deploy```

## Routes

Base_URL = ```http://localhost:8080/v1/```


#### About
- ``` GET /about.json```

#### Github
- ``` GET /github/userRepository?user=<name>&type=<type>&per_page=<per_page>```
    - user: le nom de l'utilisateur
    - type: owner, member, all
    - per_page: le nombre d'éléments par page

#### Epitech Intra
- ``` GET /intra/user?autologin=<autologin>```
    - autologin: auto login de l'utilisateur

#### Riot
- ``` GET /riot/champion?name=<name>```
    - name: nom du champion
- ``` Get /riot/item?name=<name>```
    - name: nom de l'item

#### Weather
- ``` GET /weather/current?city=<city>```
    - city: nom de la ville
- ``` GET /weather/forecast?city=<city>```
    - city: nom de la ville
- ``` GET /weather/ip```

#### Youtube
- ``` GET /youtube/channel?name=<name>```
    - name: nom de la chaine
- ``` GET /youtube/channelVideos?name=<name>&order=<page>&per_page=<per_page>```
    - name: nom de la chaine
    - order: le tri a effectuer : date, rating, relevance, title, viewCount, videoCount
    - per_page: le nombre d'éléments par page (max: 50)

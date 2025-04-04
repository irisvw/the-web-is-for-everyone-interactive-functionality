# TuMi Mundo (Interactive Functionality)



## Inhoudsopgave

  * [Beschrijving](#beschrijving)
  * [Gebruik](#gebruik)
  * [Kenmerken](#kenmerken)
  * [Installatie](#installatie)
  * [Bronnen](#bronnen)
  * [Licentie](#licentie)

## Beschrijving

<!-- Bij Beschrijving staat kort beschreven wat voor project het is en wat je hebt gemaakt -->
Ik heb de overzichtspagina van de lessen van TuMi Mundo gemaakt. Deze pagina bevat een overzicht van alle stories en playlists die je kunt beluisteren. Je kunt je eigen playlists bekijken, direct navigeren naar een overzicht van alle stories, of je gelikede playlists zien. Ook is er een sectie van gesuggereerde playlists.

<!-- Voeg een mooie poster visual of video toe 📸 -->
#### Screenshots
<img src="https://github.com/user-attachments/assets/888887e4-17dc-496c-9a41-155d272ae903" height="500">
<img src="https://github.com/user-attachments/assets/46676d23-fe79-4844-8c18-191fb815053e" height="500">
<!-- Voeg een link toe naar GitHub Pages 🌐-->

#### Live link
https://the-web-is-for-everyone-interactive-y9jw.onrender.com/

## Gebruik
<!-- Bij Gebruik staat de user story, hoe het werkt en wat je er mee kan. -->
"Als gebruiker wil ik playlists die ik leuk vind een like kunnen geven, zodat ik ze later gemakkelijk terug kan vinden."

Gebruikers kunnen bij de playlists in de 'suggested playlists' sectie op het hartje klikken. De like wordt opgeslagen in de database. Wanneer de gebruiker vervolgens de pagina bezoekt, staan al hun gelikede playlists in de 'liked playlists' categorie, zodat ze hun favoriete playlists snel terug kunnen vinden.

![tumi_demo1](https://github.com/user-attachments/assets/2f3e4456-1740-47b2-9096-204d518d4e6c)


## Kenmerken
<!-- Bij Kenmerken staat welke technieken zijn gebruikt en hoe. Wat is de HTML structuur? Wat zijn de belangrijkste dingen in CSS? Wat is er met JS gedaan en hoe? Misschien heb je iets met NodeJS gedaan, of heb je een framework of library gebruikt? -->
#### Partials
Ik heb partials aangemaakt voor de horizontale lijsten, en de grid-style lijsten. Je kan een optionele actie meegeven om een like of dislike knop op de kaartjes weer te geven.
https://github.com/irisvw/the-web-is-for-everyone-interactive-functionality/blob/05ac92b61b00be8118639717e8585f4205e42cf9/views/index.liquid#L52-L55

#### Scroll Snap
Ik heb de scroll snap property gebruikt voor de grid-style list, zodat de story cards altijd goed in beeld zijn.
https://github.com/irisvw/the-web-is-for-everyone-interactive-functionality/blob/05ac92b61b00be8118639717e8585f4205e42cf9/public/styles/style.css#L232-L234

#### Conditional Rendering
Ik heb control flow tags gebruikt om tekst weer te geven indien er geen inhoud is om weer te geven. 
https://github.com/irisvw/the-web-is-for-everyone-interactive-functionality/blob/05ac92b61b00be8118639717e8585f4205e42cf9/views/index.liquid#L41-L47

#### Filter
Ik heb de filter function gebruikt in combinatie met includes om de playlists te sorteren in drie categorieën: playlists die de gebruiker zelf heeft aangemaakt, playlists die de gebruiker heeft geliked, en playlists die de gebruiker niet heeft geliked (gesuggereerde playlists). 
https://github.com/irisvw/the-web-is-for-everyone-interactive-functionality/blob/05ac92b61b00be8118639717e8585f4205e42cf9/server.js#L36-L43

## Installatie
<!-- Bij Installatie staat hoe een andere developer aan jouw repo kan werken -->
1. Navigeer naar nodejs.org en installeer de NodeJS ontwikkelomgeving. Kies voor NodeJS 22.14.0 with long-term support, download de benodigde bestanden en doorloop het installatieproces.
2. Fork daarna deze repository en clone deze op jouw computer.
3. Open deze repository in je editor, bijvoorbeeld VS code.
4. Voer in de terminal het commando `npm install` uit
5. Start de site op door in de terminal het commando `npm start` uit te voeren.


## Bronnen

## Licentie

This project is licensed under the terms of the [MIT license](./LICENSE).

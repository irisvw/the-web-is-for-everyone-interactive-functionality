import express from 'express'
import { Liquid } from 'liquidjs';

const app = express()
// Maak werken met data uit formulieren iets prettiger
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const engine = new Liquid();
app.engine('liquid', engine.express());
app.set('views', './views');

const baseURL = "https://fdnd-agency.directus.app/items/tm_"

// https://expressjs.com/en/5x/api.html#app.get.method
app.get("/", async function (req, res) {
  let stories = await fetch(`${baseURL}story`);
  let seasons = await fetch(`${baseURL}season`);
  let languages = await fetch(`${baseURL}language`);
  let animals = await fetch(`${baseURL}animal`);
  let playlists = await fetch(`${baseURL}playlist`);

  let storiesJSON = await stories.json();
  let seasonsJSON = await seasons.json();
  let languagesJSON = await languages.json();
  let animalsJSON = await animals.json();
  let playlistsJSON = await playlists.json();
  
  // Zie https://expressjs.com/en/5x/api.html#res.render over response.render()
  res.render('index.liquid', {
    stories: storiesJSON.data,
    seasons: seasonsJSON.data,
    languages: languagesJSON.data,
    animals: animalsJSON.data,
    playlists: playlistsJSON.data,
  }
  )
})

app.post("/", async function (req, res) {
  await fetch("", {
    method: 'POST',
    body: JSON.stringify({
      playlist: req.params.playlist,
      profile: req.params.profile
    }),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });

  res.redirect(303, '/');
});


/*
// Zie https://expressjs.com/en/5x/api.html#app.post.method over app.post()
app.post(…, async function (request, response) {

  // In request.body zitten alle formuliervelden die een `name` attribuut hebben in je HTML
  console.log(request.body)

  // Via een fetch() naar Directus vullen we nieuwe gegevens in

  // Zie https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch over fetch()
  // Zie https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify over JSON.stringify()
  // Zie https://docs.directus.io/reference/items.html#create-an-item over het toevoegen van gegevens in Directus
  // Zie https://docs.directus.io/reference/items.html#update-an-item over het veranderen van gegevens in Directus
  await fetch(…, {
    method: …,
    body: JSON.stringify(…),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });

  // Redirect de gebruiker daarna naar een logische volgende stap
  // Zie https://expressjs.com/en/5x/api.html#res.redirect over response.redirect()
  response.redirect(303, …)
})
*/


// Stel het poortnummer in waar Express op moet gaan luisteren
// Lokaal is dit poort 8000; als deze applicatie ergens gehost wordt, waarschijnlijk poort 80
app.set('port', process.env.PORT || 8000)

// Start Express op, gebruik daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console
  console.log(`Daarna kun je via http://localhost:${app.get('port')}/ jouw interactieve website bekijken.\n\nThe Web is for Everyone. Maak mooie dingen 🙂`)
})

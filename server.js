import express from 'express'
import { Liquid } from 'liquidjs';

const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const engine = new Liquid();
app.engine('liquid', engine.express());
app.set('views', './views');

const baseURL = "https://fdnd-agency.directus.app/items/tm_";
const defaultProfile = 124;

let stories = await fetch(`${baseURL}story?fields=*.*`);
let seasons = await fetch(`${baseURL}season`);
let languages = await fetch(`${baseURL}language`);
let animals = await fetch(`${baseURL}animal`);
let playlists = await fetch(`${baseURL}playlist?fields=creator,id,title,image`);

let storiesJSON = await stories.json();
let seasonsJSON = await seasons.json();
let languagesJSON = await languages.json();
let animalsJSON = await animals.json();
let playlistsJSON = await playlists.json();

app.get("/", async function (req, res) {
  let likes = await fetch(`${baseURL}likes?fields=playlist&filter[_and][0][profile][id][_eq]=${defaultProfile}&filter[_and][1][playlist][_nnull]`);
  let likesJSON = await likes.json();

  // convert array of objects to array of values
  let likesArray = likesJSON.data.map(a => a.playlist);

  let playlistsArray = playlistsJSON.data;

  // for each playlist, check if the creator matches the defaultProfile
  const yourPlaylists = playlistsArray.filter((playlist) => playlist.creator == defaultProfile);

  // for each playlist, check if the id is featured in the likesArray
  const likedPlaylists = playlistsArray.filter((playlist) => likesArray.includes(playlist.id));

  // for each playlist, check if the id is NOT featured in the likesArray
  const suggestedPlaylists = playlistsArray.filter((playlist => !likesArray.includes(playlist.id)));

  res.render('index.liquid', {
    stories: storiesJSON.data,
    suggestedPlaylists: suggestedPlaylists,
    likedPlaylists: likedPlaylists,
    yourPlaylists: yourPlaylists
  });
})

app.get("/stories", async function (req, res) {
  res.render('stories.liquid', {
    stories: storiesJSON.data,
    seasons: seasonsJSON.data,
    languages: languagesJSON.data,
    animals: animalsJSON.data,
    playlists: playlistsJSON.data,
  });
})

app.get('/stories/filter', async function (req, res) {

});

app.post(`/:profile/:playlist/like`, async function (req, res) {
  await fetch(`${baseURL}likes`, {
    method: 'POST',
    body: JSON.stringify({
      profile: defaultProfile,
      playlist: req.params.playlist,
    }),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });

  res.redirect(303, '/');
});

app.post('/:profile/:playlist/unlike', async function (req, res) {
  const like = await fetch(`${baseURL}likes?filter[_and][0][profile][_eq]=${defaultProfile}&filter[_and][1][playlist][_eq]=${req.params.playlist}`);
  const likeJSON = await like.json();
  const likeID = likeJSON.data[0].id;

  await fetch(`${baseURL}likes/${likeID}`, {
    method: 'DELETE'
  });

  res.redirect(303, `/`);
})

app.set('port', process.env.PORT || 8000)

app.listen(app.get('port'), function () {
  console.log(`Daarna kun je via http://localhost:${app.get('port')}/ jouw interactieve website bekijken.\n\nThe Web is for Everyone. Maak mooie dingen 🙂`)
})

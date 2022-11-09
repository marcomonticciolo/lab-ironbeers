const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const { getEnabledCategories } = require('trace_events');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(path.join(__dirname, 'views/partials'));


app.get('/beers', (req, res, next) => {
    
punkAPI
  .getBeers()
  .then(beersFromApi => {

    console.log(beersFromApi)

    res.render("beers.hbs", { beersFromApi })
  })
  .catch(error => console.log(error));


});

app.get('/random-beer', (req, res, next) => {

  punkAPI
  .getRandom()
  .then(responseFromAPI => {
    console.log({responseFromAPI})
    res.render("random-beer", responseFromAPI[0])
  })
  .catch(error => console.log(error));

});


app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));

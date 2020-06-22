const http = require('http');
const app = require('./app');
const swapiPeople = require('./api/swapi/swapi_people');
const swapiStarships = require('./api/swapi/swapi_starships');


const swapi = require('swapi-node');

const port = process.env.PORT || 3000;
const server = http.createServer(app);


server.listen(port, () => {
    
    swapi.get('https://swapi.dev/api/people/1').then((result) => {
        swapiPeople.postPerson(result);
    });


    //swapiPeople.initSavePeopleDB();
    //swapiStarships.getStarshipByID('5eeff86a2d48c7769b72f87a');
    //swapiPeople.getPeopleByID('5eeff86a2d48c7769b72f87a');
    
});
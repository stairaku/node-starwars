const http = require('http');
const app = require('./app');
const swapiPeople = require('./api/swapi/swapi_people');
const swapiStarships = require('./api/swapi/swapi_starships');


// Initialize server
const port = process.env.PORT || 3000;
const server = http.createServer(app);

//Function that populates database for the first time
//TODO: comment the functions when database is populated and server is going to reset several times.
server.listen(port, () => {

    swapiPeople.initLoadPeopleDB('https://swapi.dev/api/people/?page=1');
    swapiStarships.initLoadStarshipsDB('https://swapi.dev/api/starships/?page=1');

    setTimeout(() => {
       
        swapiPeople.initLoadStarshipsRefs('https://swapi.dev/api/people/?page=1');
        swapiStarships.initLoadPilotsRefs('https://swapi.dev/api/starships/?page=1');
        
    }, 5000);
    
});

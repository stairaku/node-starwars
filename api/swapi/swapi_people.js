const swapi = require('swapi-node');
const mongoose = require('mongoose');

const Person = require('../models/person');
const swapiStarship = require('./swapi_starships');


module.exports.getTotalPeople = function () {
    var total = swapi.get('https://swapi.dev/api/people/?page=1').then((result) => {
        return result.count;
    });
    return total;
}

module.exports.initSavePeopleDB = function() {

    this.getTotalPeople().then(total => {
        //console.log("TOTAL PPL: " + total);
        for(var i= 1; i <= 3; i ++) {
            swapi.get('https://swapi.dev/api/people/'+i).then((result) => {
                var starships = result.starships;
                const person = new Person({
                    _id: new mongoose.Types.ObjectId(),
                    name: result.name,
                    height: result.height,
                    mass: result.mass,
                    hair_color: result.hair_color,
                    skin_color: result.skin_color,
                    eye_color: result.eye_color,
                    birth_date: result.birth_date,
                    gender: result.gender,
                    homeworld: result.homeworld,
                    created: result.created,
                    edited: result.edited,
                    url: result.url
                });
                person.save().then(newObject => {
                    console.log(newObject);
                    console.log(starships);
                    
                }).catch(err => console.log(err));
            }).catch(err => console.log(err));
        }
    });
}

module.exports.postPerson = function(objectData) {
    var starships = objectData.starships;
    const person = new Person({
        _id: new mongoose.Types.ObjectId(),
        name: objectData.name,
        height: objectData.height,
        mass: objectData.mass,
        hair_color: objectData.hair_color,
        skin_color: objectData.skin_color,
        eye_color: objectData.eye_color,
        birth_date: objectData.birth_date,
        gender: objectData.gender,
        homeworld: objectData.homeworld,
        created: objectData.created,
        edited: objectData.edited,
        url: objectData.url
    });
    person.save().then(newObject => {
        //console.log(newObject);
        //console.log(starships);
        for(var i in starships) {
            (function(i) {
                var starshipToFind = starships[i];
                var starshipID = starshipToFind.slice(-3);

                swapiStarship.getStarshipByURL(starshipToFind)
                .then(result => {
                    //console.log(result);
                    if(result.length === 0) {
                        swapiStarship.createStarShipsByRefs(starshipID);
    
                    } else {
                        console.log("SI EXISTE NAVE");
                    }
                }).catch(error => {
                    console.log(error);
                    return error;
                });
            })(i);
        }
    }).catch(err => console.log(err));
}

module.exports.getPeopleByID = function (objectID) {
    var person = Person.findById(objectID)
    .exec()
    .then(result => {
        console.log(result);
        return result;
    })
    .catch(err =>  {
        console.log(err);
        return err;
    });

    return person;
}
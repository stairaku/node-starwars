/**
 * Swapi_people controls all needed functions to pre-load people data from SWAPI REST API to MongoDB
 */

const swapi = require('swapi-node');
const mongoose = require('mongoose');

const Person = require('../models/person');
const swapiStarship = require('./swapi_starships');


/**
 * Function used to pre-load people data from SWAPI REST API to MongoDB
 * @param {*} url 
 */
module.exports.initLoadPeopleDB = function(url) {

    var _this = this;
    var next = url;
    
    var next = swapi.get(url).then((result) => {
        var results = result.results;
        console.log(results);
        for(var i in results) {
            (function(i) {
                _this.postPerson(results[i]);
            })(i);
        }

        if(result.next != null) {
            var nextSubstring = result.next.substring(7);
            next = 'https://' + nextSubstring;
            _this.initLoadPeopleDB(next);
        } 
        }).catch(error => {
            console.log(error);
        });
    
}


/**
 * Function that pre-loads the relationship between people and starships. It updates each person
 * object by inserting the reference of starships according to SWAPI REST API data
 * @param {*} url 
 */
module.exports.initLoadStarshipsRefs = function(url){

    var _this = this;
    var next = url;
    
    var next = swapi.get(url).then((result) => {
        var results = result.results;
        console.log(results);
        for(var i in results) {
            (function(i) {
                _this.updateStarshipsRefs(results[i]);
            })(i);
        }

        if(result.next != null) {
            var nextSubstring = result.next.substring(7);
            next = 'https://' + nextSubstring;
            _this.initLoadStarshipsRefs(next);
        } 
        }).catch(error => {
            console.log(error);
        });

}


/**
 * Function that looks for a person in MongoDB by its URL attribute. Returns a person object 
 * from MongoDB that has the URL parameter
 * @param {*} objectURL
 */
module.exports.getPersonByURL = function (objectURL) {
    var person = Person.find({url: objectURL})
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


/**
 * Function that creates a new person in MongoDB. Returns the created object.
 * @param {*} objectData 
 */
module.exports.postPerson = function(objectData) {
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
    person.save().then((newPerson) => {
        
    }).catch(err => console.log(err));
}


/**
 * Function that updates the starship attribute from a given person from SWAPI REST API
 * @param {*} personData: person object from SWAPI REST API
 */
module.exports.updateStarshipsRefs = function (personData) {

    var _this = this;
    var starships = personData.starships;
    this.getPersonByURL(personData.url)
        .then(personResult => {
            var personID = personResult[0]._id;

            for(var i in starships) {
                (function(i) {
                    swapiStarship.getStarshipByURL(starships[i])
                    .then(foundStarship => {
                        
                        Person.updateOne({_id: personID}, {$push: {starships: [foundStarship[0]._id]}})
                        .exec()
                        .then(result => {
                            console.log(result);
                        }).catch(err => { console.log(err)});
                    }).catch(err => {
                        console.log(err);
                    });
                })(i);}


        }).catch(error => {
            console.log(error);  
        });
}
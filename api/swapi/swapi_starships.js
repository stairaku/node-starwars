/**
 * Swapi_starship controls all needed functions to pre-load Starships data from SWAPI REST API to MongoDB
 */

const swapi = require('swapi-node');
const mongoose = require('mongoose');

const Starship = require('../models/starship');
const { json } = require('body-parser');

const swapiPeople = require('./swapi_people');


/**
 * Function used to pre-load starships data from SWAPI REST API to MongoDB
 * @param {*} url 
 */
module.exports.initLoadStarshipsDB = function(url) {

    var _this = this;
    var next = url;
    
    var next = swapi.get(url).then((result) => {
        var results = result.results;
        console.log(results);
        for(var i in results) {
            (function(i) {
                _this.postStarship(results[i]);
            })(i);
        }

        if(result.next != null) {
            var nextSubstring = result.next.substring(7);
            next = 'https://' + nextSubstring;
            _this.initLoadStarshipsDB(next);
        } 
        }).catch(error => {
            console.log(error);
        });
}


/**
 * Function that pre-loads the relationship between starships and pilots (people). It updates each 
 * person object by inserting the reference of pilots according to SWAPI REST API data
 * @param {*} url 
 */
module.exports.initLoadPilotsRefs = function(url){

    var _this = this;
    var next = url;
    
    var next = swapi.get(url).then((result) => {
        var results = result.results;
        console.log(results);
        for(var i in results) {
            (function(i) {
                _this.updatePilotsRefs(results[i]);
            })(i);
        }

        if(result.next != null) {
            var nextSubstring = result.next.substring(7);
            next = 'https://' + nextSubstring;
            _this.initLoadPilotsRefs(next);
        } 
        }).catch(error => {
            console.log(error);
        });

}


/**
 * Function that looks for a starship in MongoDB by its URL attribute. Returns a starship object 
 * from MongoDB that has the URL parameter
 * @param {*} objectURL 
 */
module.exports.getStarshipByURL = function (objectURL) {
    var starship = Starship.find({url: objectURL})
    .exec()
    .then(result => {
        //console.log(result);
        return result;
    })
    .catch(err =>  {
        console.log(err);
        return err;
    });

    return starship;
}


/**
 * Function that creates a new starship in MongoDB. Returns the created object.
 * @param {*} objectData 
 */
module.exports.postStarship = function(objectData) {
    var newStarship = new Starship({
        _id: new mongoose.Types.ObjectId(),
        name: objectData.name,
        model: objectData.model,
        manufacturer: objectData.manufacturer,
        cost_in_credits: objectData.cost_in_credits,
        length: objectData.length,
        max_atmosphering_speed: objectData.max_atmosphering_speed,
        crew: objectData.crew,
        passengers: objectData.passengers,
        cargo_capacity: objectData.cargo_capacity,
        consumables: objectData.consumables,
        hyperdrive_rating: objectData.hyperdrive_rating,
        MGLT: objectData.MGLT,
        starship_class: objectData.starship_class,
        created: objectData.created,
        edited: objectData.edited,
        url: objectData.url
    });
    var returnedNewObject = newStarship.save().then(newObject => {

        return newObject;
    }).catch(err => {
        console.log(err);
        return err.json({error: err});
    });

    return returnedNewObject;
}


/**
 * Function that updates the pilots attribute from a given starship.
 * @param {*} starshipData: starship object from SWAPI REST API
 */
module.exports.updatePilotsRefs = function (starshipData) {

    var pilots = starshipData.pilots;
    this.getStarshipByURL(starshipData.url)
        .then(starshipResult => {
            var starshipID = starshipResult[0]._id;
    
            for(var i in pilots) {
                (function(i) {
                    swapiPeople.getPersonByURL(pilots[i])
                    .then(foundPilot => {
                            
                        Starship.updateOne({_id: starshipID}, {$push: {pilots: [foundPilot[0]._id]}})
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
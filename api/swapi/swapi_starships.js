const swapi = require('swapi-node');
const mongoose = require('mongoose');

const Starship = require('../models/starship');
const { json } = require('body-parser');

module.exports.getTotalStarships = function () {
    var total = swapi.get('https://swapi.dev/api/starships/?page=1').then((result) => {
        return result.count;
    });
    return total;
}
module.exports.getStarship = function (objectID) {
    swapi.get('https://swapi.dev/api/starships/'+ objectID)
    .then((result) => {
        console.log(result);
        return result;
    }).catch(error => {
        return error;
    });
}
module.exports.getStarshipByID = function (objectID) {
    var starship = Starship.findById(objectID)
    .exec()
    .then(result => {
        console.log(result);
        return result;
    })
    .catch(err =>  {
        console.log(err);
        return err;
    });

    return starship;
}

module.exports.getStarshipByURL = function (objectURL) {
    var starship = Starship.find({url: objectURL})
    .exec()
    .then(result => {
        console.log(result);
        return result;
    })
    .catch(err =>  {
        console.log(err);
        return err;
    });

    return starship;
}

module.exports.postStarship = function(objectData) {
    console.log("POST: " + objectData);
    var pilots = objectData.pilots;
    const Starship = new Starship({
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
        //pilots: [{type: mongoose.Schema.Types.ObjectId, ref: 'Person'}],
        created: objectData.created,
        edited: objectData.edited,
        url: objectData.url
    });
    person.save().then(newObject => {
        console.log(newObject);
        console.log(pilots);
        // for(var i = 0; i < starships.length; i++) {
        //     swapiStarship.getStarshipByURL(starships[i])
        //     .then(result => {
        //         //console.log(result);
        //         if(result.length === 0) {
        //             console.log("NO EXISTE NAVE");
                    
        //         } else {
        //             console.log("SI EXISTE NAVE");
        //         }
        //     }).catch(error => {
        //         console.log(error);
        //         return error;
        //     });

        //     //console.log(starship);
        // }
    }).catch(err => console.log(err));
}

module.exports.createStarShipsByRefs = function (objectURL) {
    
    this.getStarship(objectURL)
        .then(result => {
            this.postStarship(result);
            return result;
        }).catch(error => {
            return error;
        })
}
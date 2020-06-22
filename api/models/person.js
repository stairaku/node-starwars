const mongoose = require('mongoose');

const personSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    height: Number,
    mass: Number,
    hair_color: String,
    skin_color: String,
    eye_color: String,
    birth_date: String,
    gender: String,
    homeworld: String,
    starships: [{type: mongoose.Schema.Types.ObjectId, ref: 'Starship'}],
    created: String,
    edited: String,
    url: String
});

module.exports = mongoose.model('Person', personSchema);
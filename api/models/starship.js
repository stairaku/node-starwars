const mongoose = require('mongoose');

const starshipSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    model: String,
    manufacturer: String,
    cost_in_credits: Number,
    length: Number,
    max_atmosphering_speed: Number,
    crew: Number,
    passengers: Number,
    cargo_capacity: Number,
    consumables: String,
    hyperdrive_rating: Number,
    MGLT: Number,
    starship_class: String,
    pilots: [{type: mongoose.Schema.Types.ObjectId, ref: 'Person'}],
    created: String,
    edited: String,
    url: String
});

module.exports = mongoose.model('Starship', starshipSchema);
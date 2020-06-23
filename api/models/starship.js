const mongoose = require('mongoose');

/**
 * Moongose schema to model Starship into MongoDB
 */

const starshipSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    model: String,
    manufacturer: String,
    cost_in_credits: String,
    length: String,
    max_atmosphering_speed: String,
    crew: String,
    passengers: String,
    cargo_capacity: String,
    consumables: String,
    hyperdrive_rating: String,
    MGLT: String,
    starship_class: String,
    pilots: [{type: mongoose.Schema.Types.ObjectId, ref: 'person'}],
    created: String,
    edited: String,
    url: String
});

module.exports = mongoose.model('Starship', starshipSchema);
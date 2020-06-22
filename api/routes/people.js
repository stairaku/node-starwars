const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Person = require('../models/person');

router.get('/', (req, res) => {
    Person.find()
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err =>  {
        console.log(err);
        res.status(500).json({error: err});
    });
    
});

router.get('/:peopleId', (req, res) => {
    const id = req.params.peopleId;
    Person.findById(id)
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err =>  {
        console.log(err);
        res.status(500).json({error: err});
    });
});

router.post('/', (req, res) => {
    const person = new Person({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        height: req.body.height,
        mass: req.body.mass,
        hair_color: req.body.hair_color,
        skin_color: req.body.skin_color,
        eye_color: req.body.eye_color,
        birth_date: req.body.birth_date,
        gender: req.body.gender,
        homeworld: req.body.homeworld,
        starships: req.body.starships
    });
    person.save().then(result => {
        console.log(result);
    }).catch(err => console.log(err));
    res.status(201).json({
        message: 'Handling POST request to /people',
        createdPerson: person
    });
});

// TODO: Post new Objects
// TODO: Update object by ID
// TODO: Delete object by ID

module.exports = router;
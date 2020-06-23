/**
 * Routes for the starship's model. They are routes to serve starships' data
 */

const express = require('express');
const router = express.Router();
const Starship = require('../models/starship');


/**
 * route that gets all the starships in the database
 */
router.get('/', (req, res, next) => {
    Starship.find()
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err =>  {
        console.log(err);
        res.status(500).json({error: err});
    });
});


/**
 * route that gets a starship in the database based on their ID
 */
router.get('/:starshipId', (req, res, next) => {
    const id = req.params.starshipId;
    Starship.findById(id)
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err =>  {
        console.log(err);
        res.status(500).json({error: err});
    });
});

// router.post('/', (req, res, next) => {
//     res.status(201).json({
//         message: 'Handling POST request to /starship'
//     });
// });

// TODO: Post new Starship
// TODO: Update starship by ID
// TODO: Delete starship by ID

module.exports = router;
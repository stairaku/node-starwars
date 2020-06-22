const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET request to /starships'
    });
});

router.get('/:starshipId', (req, res, next) => {
    const id = req.params.peopleId;
    res.status(200).json({
        message: 'Handling GET request to /starships/id',
        id: id
    });
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Handling POST request to /starship'
    });
});

module.exports = router;
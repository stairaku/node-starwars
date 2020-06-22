const express = require ('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const peopleRoutes = require('./api/routes/people');
const starshipsRoutes = require('./api/routes/starships');

mongoose.connect('mongodb+srv://stairaku:MongoDB123@cluster0-lkf93.mongodb.net/<dbname>?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//TODO: Implement CORS allowance for Server to be requested from outside this Server.

// Routes that handle requests
app.use('/people', peopleRoutes);
app.use('/starships', starshipsRoutes);

// Handling errors from REST API
// 404 error
app.use((req,res,next) => {
    const error  = new Error('Not found');
    error.status = 404;
    next(error);
});

// 500 error
app.use((req,res,next) => {
    const error  = new Error('Internal Server Error');
    error.status = 500;
    next(error);
});

//Other errors
app.use((error, req, res, next) => {
    res.status(res.status);
    res.json({
        error: {
            message: error.message
        }
    });
})
module.exports = app;
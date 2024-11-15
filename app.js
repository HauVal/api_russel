const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const catwayRouter = require('./routes/catways');
const reservationRouter = require('./routes/reservations');

const app = express();

mongoose.connect(process.env.URL_MONGO)
    .then(() => console.log("Connexion à MongoDB réussie"))
    .catch((error) => {
        console.error("Erreur de connexion à MongoDB:", error);
        process.exit(1);
    });

app.use(cors({
    exposedHeaders: ['Authorization'],
    origin: "*"
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catways', catwayRouter);
app.use('/reservations', reservationRouter);

app.use(function(req, res, next) {
    res.status(404).json({name: 'api_russel', version: '1.0', status: 404, message: 'not_found'});
});

module.exports = app;




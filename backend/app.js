const createError = require('http-errors');
const express = require('express');
const cookieSession = require('cookie-session');
const logger = require('morgan');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();

require('./auth/passportGoogle');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
}));
app.use(cors());
app.use(session({ secret: 'melody hensley is my spirit animal' }));
app.use(passport.initialize());
app.use(passport.session());

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Nurse Joy API',
            version: '0.1.0',
            description: 'The API for Nurse Joy',
        },
    },
    apis: ['./routes/*.js'],
};

const openapiSpecification = swaggerJsdoc(options);

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(openapiSpecification)
);

const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');

app.use('/auth', authRouter);
app.use('/user', userRouter);

app.use((req, res, next) => {
    next(createError(404));
});

module.exports = app;

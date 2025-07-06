const express = require('express');
const AppError = require('./utils/appError')
const developmentRouter = require('./routes/developmentRoutes');

const app = express();


// TODO: This allows Cross-Origin Resource Sharing (CORS) in development, it needs to be removed when in production
const cors = require('cors');
app.use(cors());


// body parser, reading data from body into req.body, NEEDED TO RECEIVE POSTED JSON DATA!
app.use(express.json({ limit: '10kb' }));

// add request time to request
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ROUTES //////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.use('/api/v1/development', developmentRouter);

// HANDLE UNDEFINED ROUTES
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = app;

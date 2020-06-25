const express = require('express');
const path = require('path');
const cookieparser = require('cookie-parser');
const apiRouter = require('./routes/api');

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

app.use('/api', apiRouter);

if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.join(__dirname, '../build')));
  app.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
  });
}

// Error Handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: err,
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, ...err };
  console.log(`MIDDLEWARE ERROR: ${errorObj.log}`);
  res.status(errorObj.status).send(JSON.stringify(errorObj.log));
});

module.exports = app.listen(PORT, () => console.log(`listening on port ${PORT}`));

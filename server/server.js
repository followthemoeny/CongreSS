const express = require('express');
const path = require('path');
const cookieparser = require('cookie-parser')

const app = express();

const PORT = 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieparser());

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV !== 'development') {
  app.use('/build', express.static(path.join(__dirname, '../build')));
  // serve index.html on the route '/'
  app.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
  });
}  

// Error Handler
app.use(function(err, req, res, next) {
  const defaultErr = {
    log: `'MIDDLEWARE ERROR', ${err}`,
    status: 400,
    message: { err: 'An error occurred' },
  }
  const errorObj = Object.assign({}, defaultErr, err)
  console.log(errorObj.log)
  res.status(errorObj.status).send(JSON.stringify(errorObj.message))
})
  
app.listen(PORT, ()=> console.log('listening on port 3000'))

module.exports = app;
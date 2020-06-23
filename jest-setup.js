module.exports = async () => {
  global.testServer = await require('./server');
  console.log(global);
};

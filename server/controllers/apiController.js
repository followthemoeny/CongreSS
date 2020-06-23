const key = require('../../secret');
const { resource } = require('../server');

const apiController = {};

apiController.getElectionInfo = (req, res, next) => {
  const { address } = req.params;
  if (!address) res.sendStatus(400);
  fetch(`https://www.googleapis.com/civicinfo/v2/voterinfo?key=${key}&address=${address}`)
    .then((response) => response.json())
    .then((data) => {
      const { election, pollingLocations } = data;
      res.locals.electionInfo = { ...election, ...pollingLocations };
      next();
    })
    .catch((error) => next(error));
};

apiController.getRepInfo = (req, res, next) => {
  const { address } = req.params;
  if (!address) res.sendStatus(400);

  fetch(`https://www.googleapis.com/civicinfo/v2/representatives?key=${key}&address=${address}`)
    .then((response) => response.json())
    .then((data) => {
      const { offices, officials } = data;
      const reps = [];
      offices.forEach((elem) => {
        elem.officialIndices.forEach((index) => {
          reps.push({ ...officials[index], position: elem.name });
        });
      });
      res.locals.representatives = reps;
      next();
    })
    .catch((error) => next(error));
};

// apiController.getAllRepInfo
module.exports = apiController;

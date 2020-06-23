const fetch = require('node-fetch');

const { google, proPublica, fec } = require('../../secret');
const { resource } = require('../server');

const apiController = {};

apiController.getElectionInfo = (req, res, next) => {
  const { address } = req.query;
  if (!address) return res.sendStatus(400);
  fetch(`https://www.googleapis.com/civicinfo/v2/voterinfo?key=${google}&address=${address}`)
    .then((response) => response.json())
    .then((data) => {
      const { election, pollingLocations, contests } = data;
      const electionObj = { ...election, pollingLocations };
      if (contests) electionObj.contests = contests;
      res.locals.elections = electionObj;
      next();
    })
    .catch((error) => next(error));
};

apiController.getRepresentatives = (req, res, next) => {
  const { address } = req.query;
  if (!address) res.sendStatus(400);

  fetch(`https://www.googleapis.com/civicinfo/v2/representatives?key=${google}&address=${address}`)
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

apiController.getCandidateInfo = async (req, res, next) => {
  const { name, state } = req.query;
  if (!name || !state) return res.sendStatus(400);
  const candidateResp = await fetch(`https://api.open.fec.gov/v1/candidates/search/?sort_null_only=false&name=${name}&sort=name&page=1&sort_hide_null=false&sort_nulls_last=false&state=${state}&api_key=${fec}&per_page=20
  `);
  const data = await candidateResp.json();
  if (!data.results.length) return res.sendStatus(404);
  const { candidate_id } = data.results[0];

  const financeResp = await fetch(`https://api.open.fec.gov/v1/candidate/${candidate_id}/totals/?sort_null_only=false&sort=-cycle&page=1&sort_hide_null=false&sort_nulls_last=false&api_key=DEMO_KEY&per_page=20
  `);
  const financeData = await financeResp.json();
  res.locals.finance = financeData;
  next();
};

module.exports = apiController;

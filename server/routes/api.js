const express = require('express');
const snippetController = require('../controllers/apiController');
const apiController = require('../controllers/apiController');

const router = express.Router();

router.get('/officials', apiController.getRepresentatives, (req, res) => {
  return res.status(200).json(res.locals.representatives);
});
router.get('/election', apiController.getElectionInfo, (req, res) => {
  return res.status(200).json(res.locals.elections);
});
router.get('/finances', apiController.getCandidateInfo, (req, res) => {
  return res.status(200).json(res.locals.finance);
});
module.exports = router;

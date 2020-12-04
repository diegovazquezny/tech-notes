const express = require('express');
const router = express.Router();
const techController = require('../controllers/techController');

router
  .get('/notes', 
    techController.getNotes, 
    (req, res) => {
      res.status(200).json({ technologies: res.locals.tech })
    })
  .get('/all-tech', 
    techController.fetchTopics, 
    (req, res) => {
      res.status(200).json({ technologies: res.locals.allTech })
    })
  .post('/notes',
    techController.saveNotes,
    (req, res) => {
      res.status(200).json({ success: res.locals.success })
    }) 
  .get('/', (req, res) => {
    console.log('get');
    return res.sendStatus(200);
  });

module.exports = router;
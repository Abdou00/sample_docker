var express = require('express');
var db = require('../database');

var router = express.Router();

router.get('/all', (req, res) => {
  db.Person.findAll()
    .then(persons => {
      console.log(res);
      res.status(200).send(JSON.stringify(persons))
    })
    .catch(err => {
      res.status(500).send(JSON.stringify(err))
    });
});

router.get('/:id', (req, res) => {
  db.Person.findByID(req.params.id)
    .then(person => {
      res.status(200).send(JSON.stringify(person));
    })
    .catch(err => {
      res.status(500).send(JSON.stringify(err))
    });
});

// router.post('/add', function (req, res ) {});
router.post('/add', (req, res ) => {
  db.Person.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    id: req.body.id
  })
  .then(person => {
    res.status(200).send(JSON.stringify(person))
  })
  .catch(err => {
    res.status(500).send(JSON.stringify(err))
  });
});

router.delete('/:id', (req, res ) => {
  db.Person.destroy({
    where: {
      id: req.body.id
    }
  })
  .then(person => {
    res.status(200).send(`${person} has deleted successfully`)
  })
  .catch(err => {
    res.status(500).send(JSON.stringify(err))
  });
});
module.exports = router;

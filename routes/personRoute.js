const express = require('express');

const route = express.Router();
const PersonService = require('../services/PersonService');


route.get('/all', async (req, res) => {
  //sending static files.Just show public/index.html static file
  //res.sendFile(path.join(__dirname, 'public', 'index.html'));

  //render main.pug via pug view engine without parameters
  // res.render("main");

  //render main.pug with parameters
  const people = await PersonService.findAll();
  return res.status(200).json(people)
  // res.render('main', { people });
});

route.get("/:id", async(req,res) => {
  const personId = +req.params.id;
  const person = await PersonService.find(personId)
  if (!person) {
    res.status(404)
  }  
  res.status(200).json(person)
})

route.post('/', async (req, res) => {
  const personToAdd = req.body;
  const person = await PersonService.save(personToAdd);
  res.status(200).json(person);
});

route.post('/:id/friends', async (req, res) => {
  const person = await PersonService.find(req.params.id);
  const friend = await PersonService.find(req.body.targetId);
 
  //addToSet makes sure to prevent duplicates
  person.friends.addToSet(friend);
  friend.friends.addToSet(person);
  await friend.save();
  const updatedPerson = await person.save();
  return res.json(updatedPerson)
});

route.delete('/:id', async (req, res) => {
  const id = +req.params.id;
  const deletedPerson = PersonService.deletePerson(id);
  res.send("ok!");
});

module.exports = route;
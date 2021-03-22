const PersonModel = require('../models/personModel');

const PersonService = {
  findAll() {
    const people = PersonModel.find({age: {$lt:30}}).populate("friends");
    
    return people;
  },
  async find(id) {
    try {
      const person = await PersonModel.findOne({id}).populate("friends");    
      return person;
    } catch (err) {
      throw new Error(err)
    }
    
  },
  async save(person) {
    try {
      const savedPerson = await PersonModel.create(person);
      return savedPerson;
    } catch (err) { 
      return err;
    }
  },
  deletePerson(id) {
    PersonModel.deleteOne({ id }, (err, person) => {
      if (err) {
        throw new Error(err);
      }
      return person;
    });
  },
};
const { find, findAll, save, deletePerson } = PersonService;
module.exports = {
  find,
  findAll,
  save,
  deletePerson,
};

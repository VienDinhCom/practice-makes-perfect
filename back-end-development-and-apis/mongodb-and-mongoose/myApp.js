const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  favoriteFoods: [String],
});

const Person = mongoose.model('Person', personSchema);

const createAndSavePerson = async (done) => {
  try {
    const data = await Person.create({ name: 'Vien', age: 18, favoriteFoods: ['rice'] });

    done(null, data);
  } catch (error) {
    done(error);
  }
};

const createManyPeople = async (arrayOfPeople, done) => {
  try {
    const data = await Person.insertMany(arrayOfPeople);
    done(null, data);
  } catch (error) {
    done(error);
  }
};

const findPeopleByName = async (personName, done) => {
  try {
    const data = await Person.find({ name: personName });
    done(null, data);
  } catch (error) {
    done(error);
  }
};

const findOneByFood = async (food, done) => {
  try {
    const data = await Person.findOne({ favoriteFoods: food });

    done(null, data);
  } catch (error) {
    done(error);
  }
};

const findPersonById = async (personId, done) => {
  try {
    const data = await Person.findOne({ _id: personId });

    done(null, data);
  } catch (error) {
    done(error);
  }
};

const findEditThenSave = async (personId, done) => {
  try {
    const person = await Person.findById(personId);

    const foodToAdd = 'hamburger';

    person.favoriteFoods.push(foodToAdd);

    const data = await person.save();

    done(null, data);
  } catch (error) {
    done(error);
  }
};

const findAndUpdate = async (personName, done) => {
  const ageToSet = 20;

  try {
    const data = await Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true });

    done(null, data);
  } catch (error) {
    done(error);
  }
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = 'Mary';

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = 'burrito';

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;

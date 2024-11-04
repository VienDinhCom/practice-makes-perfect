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
  try {
    const ageToSet = 20;

    const data = await Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true });

    done(null, data);
  } catch (error) {
    done(error);
  }
};

const removeById = async (personId, done) => {
  try {
    const data = await Person.findByIdAndRemove(personId);

    done(null, data);
  } catch (error) {
    done(error);
  }
};

const removeManyPeople = async (done) => {
  try {
    const nameToRemove = 'Mary';

    const data = await Person.deleteMany({ name: nameToRemove });

    done(null, data);
  } catch (error) {
    done(error);
  }
};

const queryChain = async (done) => {
  try {
    const foodToSearch = 'burrito';

    const data = await Person.find({ favoriteFoods: foodToSearch })
      .sort({ name: 1 })
      .limit(2)
      .select('name favoriteFoods')
      .exec();

    done(null, data);
  } catch (error) {
    done(error);
  }
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

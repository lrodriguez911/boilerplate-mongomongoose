require('dotenv').config();

const mongoose = require('mongoose');
const mySecret = process.env.MONGO_URI

mongoose.connect(mySecret, { useNewUrlParser: true, useUnifiedTopology: true })


const { Schema } = mongoose;

const PersonSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
})

const Person = mongoose.model('Person', PersonSchema);

const createAndSavePerson = (done) => {
  let lucasRod = new Person({
    name: 'Lucas Rodriguez',
    age: 30,
    favoriteFoods: ['pizza', 'milanesas']
  });
  lucasRod.save(function(err, data) {
    if (err) return console.error(err);
    console.log(data)
    done(null, data);
  })
};
const arrayOfPeople = [
  { name: 'Exequiel', age: 31, favoriteFoods: ['guiso', 'cheese', 'burrito'] },
  { name: 'Nazarea', age: 21, favoriteFoods: ['fruits', 'spaghetti', 'cake'] },
  { name: 'Benjamin', age: 18, favoriteFoods: ['humita', 'locro', 'hamburguer'] }
]
const createManyPeople = (arrayOfPeople, done) => {

   Person.create(arrayOfPeople,function(err, datapeople) {
    if (err) return console.log(err);
    done(null, datapeople);
  })
};
//const personName = {name: 'Nazarea'}
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function(err, dataFind) {
    if (err) return console.log(err);
    done(null, dataFind)
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function(err, dataFindOne) {
    if (err) return console.log(err);
    done(null, dataFindOne)
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function(err, dataFindId)   {if (err) return console.log(err);
    done(null, dataFindId)
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, function(err, dataPerson) {
    if (err) console.error(err);
    dataPerson.favoriteFoods.push(foodToAdd);
    dataPerson.save(function(err, dataPersonUpda) {
      if (err) console.error(err);
      done(null, dataPersonUpda)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    function(err, dataFindOne) {
      if (err) return console.error(err);
      done(null, dataFindOne);
    }
  )
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId,
    function(err, PeopleToRemove){
      if(err) return console.log(err);
      done(null, PeopleToRemove)
    }
  )
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, function(err, dataToRemove){
    if(err) return console.log(err);
    done(null, dataToRemove)
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  let peopleFind = Person.find({favoriteFoods: "burrito"})
    peopleFind
      .sort({name: 1})
      .limit(2)
      .select({age: 0})
      .exec(function(err, dataFind) {
      if(err) return console.log(err);
      done(null, dataFind)})
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

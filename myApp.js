require('dotenv').config();
const mongoose = require('mongoose');
const mySecret = process.env.MONGO_URI;

mongoose.connect(mySecret, 
{ useNewUrlParser: true, useUnifiedTopology: true });

const { Schema } = mongoose;

const PersonSchema = new Schema({
  name : {type : String, required : true},
  age : Number || 18,
  gender : String,
  birthday : Date,
  favoriteFoods : [String],
})
const Person = mongoose.model('Person', PersonSchema);



const createAndSavePerson = (done) => {
  const person1 = new Person({
    name: 'Lucas Rodriguez',
    age: 30,
    favoriteFoods : ['Pizza', 'Empanadas'],
  });
  person1.save(function(err, data) {
    if (err) return console.error(err);
    console.log(data);
    done(null, data);
  })
};

const arrayOfPeople = [ {name:'Exequiel',
age:31, favoriteFoods : ['guiso', 'asado', 'sandwich']}, 
{name:'Nazarea',
age:31, favoriteFoods : ['tacos', 'verduras', 'tartas']}, 
{name:'Bennjamin',
age:31, favoriteFoods : ['locro', 'humita', 'fruits']}]

const createManyPeople = (arrayOfPeople, done) => {
 Person.create(arrayOfPeople, function(err, arraPeo){
if (err) return console.log(err);
done(null,arraPeo);
 })
  
};

const findPeopleByName = (personName, done) => {
  Person.find({name:personName}, function(err, dataFindPeo) {
    if(err) return console.log(err);
    done(null, dataFindPeo)
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function (err, dataFindOne){
    if(err) return console.log(err);
    done(null, dataFindOne);
  })
  done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function(err, dataFindId){
    if(err) return console.error(err);
    done(null, dataFindId);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, function(err, dataFindId){
    if(err) return console.log(err);
    dataFindId.favoriteFoods.push(foodToAdd);

  })
  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

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

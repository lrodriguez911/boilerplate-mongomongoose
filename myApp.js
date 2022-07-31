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
    dataFindId.save(function (err, dataUpdate) {
      if(err) return console.log(err);
      done(null, dataUpdate)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name : personName},
    {age: ageToSet},
    {new: true}, 
    function (err, dataFind){
      if(err) return console.log(err);
    done(null, dataFind)
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function(err, dataFindId){
    if(err) return console.log(err);
    done(null, dataFindId)
  })
 
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name : nameToRemove}, function(err, dataFindId){
    if(err) return console.log(err);
  done(null, dataFindId)});
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  let personFind = Person.find({favoriteFoods:foodToSearch});
  personFind
  .sort({name: -1})
  .limit(2)
  .selec({age : 0})
  .exec((err, dataFind) => {
    if(err) return console.log(err);
    done(null, dataFind)
  })
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

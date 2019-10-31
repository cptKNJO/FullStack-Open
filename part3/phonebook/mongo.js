const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];
const dbName = "phonebook";

const url = `mongodb+srv://knjo:${password}@cluster0-f4hxe.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true });

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length < 4) {
  // List all entries
  Person.find({}).then(result => {
    console.log("phonebook:")
    result.forEach(entry => {
      console.log(entry.name, entry.number);
    });
    mongoose.connection.close();
  });
} else {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  });

  person.save().then(result => {
    console.log(`added ${person.name} number ${person.number} to phonebook`);
    mongoose.connection.close();
  });
}

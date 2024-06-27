const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://laurelmatt:${password}@cluster0.4np5lj5.mongodb.net/phoneBook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

// Jos komentoriville 'node mongo.js <password> <name> <number>'
if (process.argv.length === 5) {
  const personName = process.argv[3]
  const personNumber = process.argv[4]

  const person = new Person({
    name: personName,
    number: personNumber,
  })

  person.save().then(() => {
    console.log(`added ${personName} number ${personNumber} to phonebook`)
    mongoose.connection.close()
  })
}

// Jos komentoriville 'node mongo.js <password>'
if (process.argv.length === 3) {
  console.log('phonebook:')
  Person.find({}).then((people) => {
    people.forEach((person) => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}

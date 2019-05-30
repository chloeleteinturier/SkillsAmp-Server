// bin/seed.js

const mongoose = require('mongoose');
const GrowthModel = require('./../models/growthModel');
require('dotenv').config();

// const dbName = 'skillsAmp';
// // mongoose.connect(`mongodb://localhost/${dbName}`);

// mongoose.connect(`mongodb://localhost/${dbName}`, {
//   keepAlive: true,
//   useNewUrlParser: true,
//   reconnectTries: Number.MAX_VALUE
// })

mongoose.connect(process.env.MONGODB_URI, {
  keepAlive: true,
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE
}).then(() => {
  console.log(`Connected to database`);
}).catch((error) => {
  console.error(error);
})

GrowthModel.collection.drop();

const growthModel = [
  {
    "name": "Ironhacker",
    "indicators": [
        {
            "assessedLevel": 0,
            "name": "Emphaty"
        },
        {
            "assessedLevel": 0,
            "name": "Javascript"
        },
        {
            "assessedLevel": 0,
            "name": "Communication"
        },
        {
            "assessedLevel": 0,
            "name": "Node.js"
        },
        {
            "assessedLevel": 0,
            "name": "Teamwork"
        },
        {
            "assessedLevel": 0,
            "name": "Express.js"
        },
        {
            "assessedLevel": 0,
            "name": "CSS"
        },
        {
            "assessedLevel": 0,
            "name": "HTML"
        }
    ]
  }
]

GrowthModel.create(growthModel, (err) => {
  if (err) { throw(err) }
  console.log(`Created ${growthModel.length} growthModel`)
  mongoose.connection.close();
});
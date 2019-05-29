// bin/seed.js

const mongoose = require('mongoose');
const GrowthModel = require('./../models/growthModel');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI);

const growthModel = [
    {
      "name": "Ironhacker",
      "indicators": [
      {	
        "name": "Emphaty"
      },
      {
        "name": "Javascript"
      },
      {
        "name": "Communication"
      },
      {
        "name": "Node.js"
      },
      {
        "name": "Teamwork"
      },
      {
        "name": "Express.js"
      },	
      {
        "name": "CSS"
      },
      {
        "name": "HTML"
      }]
    }
]

GrowthModel.create(growthModel, (err) => {
  if (err) { throw(err) }
  console.log(`Created ${growthModel.length} growthModels`)
  mongoose.connection.close();
});
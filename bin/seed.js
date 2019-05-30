// bin/seed.js

const mongoose = require('mongoose');
const GrowthModel = require('./../models/growthModel');
require('dotenv').config();

console.log(1)

mongoose.connect('mongodb://heroku_5hdlnr3l:7se5oo301difh7s7fc31lgrhnh@ds147926.mlab.com:47926/heroku_5hdlnr3l');

console.log(2)

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


GrowthModel.create(growthModel)
.then(()=>{
  console.log(3)
  mongoose.connection.close()
})
.catch((err)=>{
  console.log(err)
})
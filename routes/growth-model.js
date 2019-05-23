const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const GrowthModel = require('../models/growthModel');


//  GET    '/growth-model'
router.get('/', (req,res,next)=>{
  GrowthModel.find().populate('indicators')
    .then(allTheGrowthModels => {
      res.json(allTheGrowthModels);
    })
    .catch(err => {
      res.json(err);
    })
})

// POST '/growth-model'
router.post('/', (req,res) => {
  const { name, indicators } = req.body;

  GrowthModel.create({ name, indicators,})
    .then((response)=> {
      res
        .status(201)
        .json(response);
    })
    .catch((err)=> {
      res
        .status(500)  // Internal Server Error
        .json(err)
    })
})

// GET '/growth-model/:id'		 => to get a specific growth-model
router.get('/:id', (req, res) => {
  const { id } = req.params;

  if ( !mongoose.Types.ObjectId.isValid(id)) {
    res
      .status(400)  //  Bad Request
      .json({ message: 'Specified id is not valid'})
    return;
  }

  GrowthModel.findById( id ).populate('indicators')
    .then( (foundGrowthModel) => {
      res.status(200).json(foundGrowthModel);
    })
    .catch((err) => {
      res.res.status(500).json(err);
    })
  });










module.exports = router;


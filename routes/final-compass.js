const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const FinalCompass = require('../models/finalCompass');

// GET '/finalCompass/:id'		 => to get a specific user
router.get('/:id', (req, res) => {
  const { id } = req.params;

  if ( !mongoose.Types.ObjectId.isValid(id)) {
    res
      .status(400)  //  Bad Request
      .json({ message: 'Specified id is not valid'})
    return;
  }

  FinalCompass.findById( id ).populate('team').populate('evaluated')  // add .populate('') when other param of teamModel added
    .then( (foundFinalCompass) => {
      res.status(200).json(foundFinalCompass);
    })
    .catch((err) => {
      res.res.status(500).json(err);
    })
});


//  GET    '/finalCompass'
router.get('/', (req,res,next)=>{
  FinalCompass.find().populate('team').populate('evaluated') // add .populate('') when other param of usermodel added
    .then(finalCompasses => {
      res.json(finalCompasses);
    })
    .catch(err => {
      res.json(err);
    })
})




// POST '/finalCompass'
router.post('/', (req,res) => {
  const { evaluated, growthCompass, team } = req.body;

  FinalCompass.create({evaluated, growthCompass, team})
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

// PUT '/finalCompass/:id'
router.put('/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  console.log(req.body)

  FinalCompass.findByIdAndUpdate(req.params.id, req.body )
    .then(() => {
      res.json({ message: `Project with ${req.params.id} is updated successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
})

module.exports = router;

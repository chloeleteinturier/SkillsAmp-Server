const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const Checkpoint = require('../models/checkpoint');

// GET '/checkpoint/:id'		 => to get a specific user
router.get('/:id', (req, res) => {
  const { id } = req.params;

  if ( !mongoose.Types.ObjectId.isValid(id)) {
    res
      .status(400)  //  Bad Request
      .json({ message: 'Specified id is not valid'})
    return;
  }

  Checkpoint.findById( id ).populate('finalAssessments')//.populate('assessments')  // add .populate('') when other param of teamModel added
    .then( (foundCheckpoint) => {
      
      res.status(200).json(foundCheckpoint);
    })
    .catch((err) => {
      res.status(500).json(err);
    })
});


//  GET    '/checkpoint'
router.get('/', (req,res,next)=>{
  Checkpoint.find().populate('finalAssessments')//.populate('assessments')  // add .populate('') when other param of usermodel added
    .then(checkpoint => {
      res.json(checkpoint);
    })
    .catch(err => {
      res.json(err);
    })
})




// POST '/checkpoint'
router.post('/', (req,res) => {
  const { date, currentCheckpoint, assessments, finalAssessments } = req.body;
  
  Checkpoint.create({ date, assessments, finalAssessments, currentCheckpoint })
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

// PUT '/checkpoint/:id'
router.put('/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Checkpoint.findByIdAndUpdate(req.params.id, req.body )
    .then(() => {
      res.json({ message: `Project with ${req.params.id} is updated successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
})

module.exports = router;

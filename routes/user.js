const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const User = require('../models/user');

//  GET    '/user'
router.get('/', (req,res,next)=>{
  User.find().populate('team')  // add .populate('') when other param of usermodel added
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.json(err);
    })
})

// GET '/user/:id'		 => to get a specific user
router.get('/:id', (req, res) => {
  const { id } = req.params;

  if ( !mongoose.Types.ObjectId.isValid(id)) {
    res
      .status(400)  //  Bad Request
      .json({ message: 'Specified id is not valid'})
    return;
  }

  User.findById( id ).populate('team')   // add .populate('') when other param of usermodel added
    .then( (foundUser) => {
      res.status(200).json(foundUser);
    })
    .catch((err) => {
      res.res.status(500).json(err);
    })
});


  // GET '/user/email/:email'		 => to get a specific user
router.get('/email/:email', (req, res) => {
  const { email } = req.params;
  console.log(email)

  User.find( {email} ).populate('team')   // add .populate('') when other param of usermodel added
    .then( (foundUser) => {
      res.status(200).json(foundUser);
    })
    .catch((err) => {
      res.res.status(500).json(err);
    })
  });



// PUT '/user/:id'
router.put('/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  console.log(req.body)

  User.findByIdAndUpdate(req.params.id, {$set: req.body}).populate('team') 
    .then(() => {
      res.json({ message: `Project with ${req.params.id} is updated successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
})



module.exports = router;

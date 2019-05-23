const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const User = require('../models/user');

//  GET    '/user'
router.get('/', (req,res,next)=>{
  User.find()
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

  User.findById( id ).populate('indicators')
    .then( (foundUser) => {
      res.status(200).json(foundUser);
    })
    .catch((err) => {
      res.res.status(500).json(err);
    })
  });




module.exports = router;

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const Team = require('../models/teamModel');

// GET '/team/:id'		 => to get a specific user
router.get('/:id', (req, res) => {
  const { id } = req.params;

  if ( !mongoose.Types.ObjectId.isValid(id)) {
    res
      .status(400)  //  Bad Request
      .json({ message: 'Specified id is not valid'})
    return;
  }

  Team.findById( id )  // add .populate('') when other param of teamModel added
    .then( (foundTeam) => {
      res.status(200).json(foundTeam);
    })
    .catch((err) => {
      res.res.status(500).json(err);
    })
});


//  GET    '/team'
router.get('/', (req,res,next)=>{
  Team.find()  // add .populate('') when other param of usermodel added
    .then(teams => {
      res.json(teams);
    })
    .catch(err => {
      res.json(err);
    })
})




// POST '/team'
router.post('/', (req,res) => {
  const { name, members, growthModel } = req.body;

  Team.create({ name, members, growthModel})
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


// PUT '/team/:id' => to update a specific project
// router.put('/team/:id', (req, res, next)=>{

//   if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
//     res.status(400).json({ message: 'Specified id is not valid' });
//     return;
//   }

//   Team.findByIdAndUpdate(req.params.id, req.body)
//     .then(() => {
//       res.json({ message: `Project with ${req.params.id} is updated successfully.` });
//     })
//     .catch(err => {
//       res.json(err);
//     })
// })


module.exports = router;

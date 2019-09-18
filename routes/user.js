const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const User = require('../models/user');

//  GET    '/user'
router.get('/', (req,res,next)=>{
  User.find().populate('team').populate('currentGrowthCompass')   // add .populate('') when other param of usermodel added
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

  User.findById( id ).populate('team').populate('currentGrowthCompass')   // add .populate('') when other param of usermodel added
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

  User.find( {email} ).populate('team').populate('currentGrowthCompass')   // add .populate('') when other param of usermodel added
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

  User.findByIdAndUpdate(req.params.id, {$set: req.body}) //.populate('team') 
    .then(() => {
      res.json({ message: `Project with ${req.params.id} is updated successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
})


/* POST edit profile form . */
router.post('/edit-profile/:id', (req, res, next) => {
  const { _id } = req.query;
  const newFirstName = req.body.firstName;
  const newLasttName = req.body.lastName;
  const newEmail = req.body.email;
  const newPhoto = req.body.photoUrl;
  const currentPassword = req.body.password;
  const newPassword = req.body.newPassword;

  // if (newFirstName === '' || newLasttName === '' || newEmail === '' || currentPassword === '') {
  //   User.findById(_id)
  //     .then((user) => {
  //       req.flash('message-name', 'Please, enter your first name, last name, email and password');
  //       res.redirect('/edit-profile');
  //     })
  //     .catch((err) => next(err));
  // }

  User.findOne({ 'email': newEmail })
    .then((user) => {
      if (user.email !== req.session.currentUser.email && user.email !== null) {
        req.flash('message-name', 'Email already taken');
        return res.redirect('/edit-profile');
      }
    })
    .catch((err) => next(err));

  User.findById(_id)
    .then((user) => {
      const passwordCorrect = bcrypt.compareSync(currentPassword, req.session.currentUser.password);

      if (passwordCorrect) {
        if (newPassword !== '') {
          const salt = bcrypt.genSaltSync(saltRounds);
          const newHashedPassword = bcrypt.hashSync(newPassword, salt);
          return User.findOneAndUpdate({ _id }, { $set: { name: newName, email: newEmail, password: newHashedPassword } })
            .then((user) => {
              req.session.currentUser = user;
              res.redirect('/favorites');
            })
            .catch((err) => next(err));
        }

        if (newPassword === '') {
          User.findOneAndUpdate({ _id }, { $set: { name: newName, email: newEmail } }, { new: true })
            .then((user) => {
              req.session.currentUser = user;
              res.redirect('/favorites');
            })
            .catch((err) => next(err));
        }
      } else {
        req.flash('message-name', 'Password incorrect');
        res.redirect('/edit-profile');
      }
    })
    .catch((err) => next(err));
});



















// // PUT '/user/edit/:id'
// router.put('/edit/:id', (req, res, next)=>{

//   if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
//     res.status(400).json({ message: 'Specified id is not valid' });
//     return;
//   }
//   console.log('req.params', req.params)

//   User.findById( req.body._id )
//     .then( (foundUser) => {

//       console.log('foundUser', foundUser)
//       console.log('heyyyyyyyyyy', req.body)

//       const {password} = req.body

//       // if (!bcrypt.compareSync(password, foundUser.password)) {
//       //   const salt = bcrypt.genSaltSync(10);
//       //   const hashPass = bcrypt.hashSync(password, salt);
//       //   req.body.password = hashPass
//       // }
//       // console.log('holaaaaaa', req.body)

//       // User.findByIdAndUpdate(req.params.id, req.body )
//       // .then(() => {
//       //   res.json({ message: `Project with ${req.params.id} is updated successfully.` });
//       // })
//       // .catch(err => {
//       //   res.json(err);
//       // })

//     })
//     .catch((err) => {
//       res.res.status(500).json(err);
//     })

// })



module.exports = router;

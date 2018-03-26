const Product = require('./../models/user');
const mongoose = require('mongoose');
const User =  mongoose.model('User');

exports.show_users = (req, res, next) => {
User.find({}, (err, users) => {
  if(err) {
    render.json(err)
} else {
  res.render('index', {users: users})
}
}).sort({_id: -1});
};

exports.goToNew = (req, res, next) => {
  res.render('newuser');
};

exports.goToEdit = (req, res, next) => {
  const id = req.params.id;
  User.findOne({_id: id}, (err, user) => {
        if(err) {
            render.json(err);
      } else {
            res.render('edituser', {user:user});
          }
    }).sort({_id:-1});
},

exports.add_new_user = (req, res, next) => {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    location: req.body.location,
    language: req.body.language,
    comment: req.body.comment
  });
  console.log("adding a new user\n\n\n", user);
  user.save(err => {
    if(err) {
      res.render('newuser', {error: user.errors})
    } else {
      console.log("successfully add a new user");
      res.redirect('/');
    }
  });
};

exports.userinfo = (req, res, next) => {
  const id = req.params.id;
  User.findOne({_id:id}, (err, user) => {
    if(err) {
      console.log(err);
    } else {
      res.render('showuserinfo', {user: user});
    }
  });
};

exports.edit_user = (req, res, next) =>{
  const id = req.params.id;
  User.update({_id: id}, req.body, (err, user) => {
    if(err) {
      render.json(err);
    } else {
      res.redirect('user/' + id);
    }
  });
};

exports.delete_user = (req, res, next) => {
  const id = req.params.id;
  User.remove({_id: id}, (err, user) =>{
    if(err) {
      render.json(err);
    } else {
      res.redirect('/');
    }
  });
};

const { Users, Thoughts, } = require('../models');
const { ObjectId } = require('mongoose').Types;

const usersController = {
  // Get all users
  getUsers(req, res) {
    Users.find()
      .select('-__v')
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(210).json(err));
  },
  // Get a User
  getSingleUser(req, res) {
    Users.findOne
      ({
        _id: req.params.usersId
      })
      .select('-__v')
      .populate('userFriends')
      .populate('userThoughts')
      .then((dbUsersData) => {
        if (!dbUsersData) {
          return res.status(400).json({
            message: 'This ID is invalid.'
          });
        }
        res.json(dbUsersData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Create a User
  createUser(req, res) {
    console.log(req.body)
    Users.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => console.log(err));
  },

  // Delete a User
  deleteUser(req, res) {
    Users.deleteOne({
      _id: req.params.usersId
    })
      .then(
        res.json('User successfully deleted!')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Update a User
  updateUser(req, res) {
    Users.findOneAndUpdate(
      { _id: req.params.usersId },
      req.body, { runValidators: true, new: true })
      .then(
        res.json('User successfully updated!')
      )

      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },


  // Add a friend to user
  addFriend(req, res) {
    Users.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { userFriends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((Users) =>
        !Users
          ? res
            .status(404)
            .json({ message: 'No user found with that ID :(' })
          : res.json(Users)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove a friend from user
  removeFriend(req, res) {
    Users.findOneAndUpdate(
      { _id: req.params.friendId },
      { $pull: { userFriends: { friendId: req.params.friendId } } },
      { runValidators: true, new: true }
    )
      .then((Users) =>
        !Users
          ? res
            .status(404)
            .json({ message: 'No friend found with that ID :(' })
          : res.json(Users)
      )
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = usersController;
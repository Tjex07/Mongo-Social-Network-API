const { Users, Thoughts } = require('../models');

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
    Users.findOne({ _id: req.params.userID })
      .select('-__v')
      .populate('friends')
      .populate('thoughts')
      .then(dbUserData => res.json(dbUserData))

    !Users
      ? res.status(404).json({ message: 'No User with that ID' })
      : res.json(Users)

        .catch((err) => res.status(500).json(err));
  },
  // Create a User
  // createUser(req, res) {
  //   Users.create(req.body)
  //     .then((dbUserData) => {
  //       res.json(dbUserData);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       return res.status(596).json(err);
  //     });
  // },
  createUser(req, res) {
    Users.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },

  // Delete a User
  deleteUser(req, res) {
    Users.findOneAndDelete({ _id: req.params.userID })
      .then((dbUserData) => res.json(dbUserData))
    !Users
      ? res.status(404).json({ message: 'No Users with that ID' })
      : Users.deleteMany({ _id: { $in: Users.userName } })

        .then(() => res.json({ message: 'User deleted!' }))
        .catch((err) => res.status(500).json(err));
  },
  // Update a User
  updateUser(req, res) {
    Users.findOneAndUpdate(
      { _id: req.params.userID },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then(() =>
        !course
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(course)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Add a friend to user
  addFriend(req, res) {
    console.log('You are adding a friend');
    console.log(req.body);
    Users.findOneAndUpdate(
      { _id: req.params.userID },
      { $addToSet: { friends: req.params.friendID } },
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
      { _id: req.params.friendsID },
      { $pull: { friends: { friendID: req.params.friendID } } },
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
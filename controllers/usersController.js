const { Users } = require('../models');

const usersController = {
    // Get all users
    getUsers(req, res) {
        Users.find({})
            .then((dbUserData ) => res.json(dbUserData ))
            .catch((err) => res.status(500).json(err));
    },
    // Get a User
    getSingleUser({ params }, res) {
        Users.findOne({ _id: params.userID })
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
    createUser({ body }, res) {
        Users.create(body)
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // Delete a User
    deleteUser(req, res) {
        Users.findOneAndDelete({ _id: req.params.userID })
        .then((dbUserData) => res.json(dbUserData))
                !Users
                    ? res.status(404).json({ message: 'No Users with that ID' })
                    : userName.deleteMany({ _id: { $in: course.students } })
            
            .then(() => res.json({ message: 'Course and students deleted!' }))
            .catch((err) => res.status(500).json(err));
    },
    // Update a User
    updateUser(req, res) {
        Users.findOneAndUpdate(
            { _id: req.params.userID },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((dbUserData) =>
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
      { $addToSet: { friends: req.params.friendId } },
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
      { $pull: { friends: { friendsId: req.params.friendId } } },
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
const { Thoughts, Reaction } = require('../models');

module.exports = {
    // Get all Thoughts
    getThoughts(req, res) {
        Thoughts.find({})
            .then((dbThoughtData ) => res.json(dbThoughtData ))
            .catch((err) => res.status(500).json(err));
    },
    // Get a Thought
    getSingleThought(req, res) {
        Thoughts.findOne({ _id: req.params.ThoughtId })
            .select('-__v')
            .populate('reactions')
            .then((dbThoughtData ) =>
                !Thoughts
                    ? res.status(404).json({ message: 'No Thought with that ID' })
                    : res.json(dbThoughtData )
            )
            .catch((err) => res.status(500).json(err));
    },
    // Create a Thought
    createThoughts(req, res) {
        Thoughts.create(req.body)
            .then((dbThoughtData ) => res.json(dbThoughtData ))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // Delete a Thought
    deleteThoughts(req, res) {
        Thoughts.findOneAndDelete({ _id: req.params.userID })
            .then((dbThoughtData ) =>
                !Thoughts
                    ? res.status(404).json({ message: 'No Thoughts with that ID' })
                    : userName.deleteMany({ _id: { $in: course.students } })
            )
            .then(() => res.json({ message: 'thoughts deleted!' }))
            .catch((err) => res.status(500).json(err));
    },
    // Update a Thought
    updateThoughts(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((Thoughts) =>
                !course
                    ? res.status(404).json({ message: 'No user with this id!' })
                    : res.json(course)
            )
            .catch((err) => res.status(500).json(err));
    },

     // Add a reaction
  addReaction(req, res) {
    console.log('You are adding a friend');
    console.log(req.body);
    Thoughts.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((Thoughts) =>
        !Thoughts
          ? res
              .status(404)
              .json({ message: 'No user found with that ID :(' })
          : res.json(Thoughts)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove a reaction
  removeReaction(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.friendId },
      { $pull: { friends: { friendsId: req.params.friendId } } },
      { runValidators: true, new: true }
    )
      .then((Thoughts) =>
        !Thoughts
          ? res
              .status(404)
              .json({ message: 'No friend found with that ID :(' })
          : res.json(Thoughts)
      )
      .catch((err) => res.status(500).json(err));
  },
};

// module.exports = thoughtsController;
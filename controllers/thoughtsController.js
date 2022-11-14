const { Thoughts, Reactions } = require('../models');


module.exports = {
    // Get all Thoughts
    getThoughts(req, res) {
        Thoughts.find({})
            .then((dbThoughtData) => res.json(dbThoughtData))
            .catch((err) => res.status(500).json(err));
    },
    // Get a Thought
    getSingleThought(req, res) {
        Thoughts.findOne({ _id: req.params.thoughtID })
            .select('-__v')
            .populate('reactions')
            .then((dbThoughtData) =>
                !Thoughts
                    ? res.status(404).json({ message: 'No Thought with that ID' })
                    : res.json(dbThoughtData)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Create a Thought
    createThoughts(req, res) {
        Thoughts.create(req.body)
            .then((dbThoughtData) => res.json(dbThoughtData))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // Delete a Thought
    deleteThoughts(req, res) {
        Thoughts.findOneAndDelete({ _id: req.params.thoughtID })
                .then(() => res.json({ message: 'thoughts deleted!' }))
                .catch((err) => res.status(500).json(err));
    },

    // Update a Thought
    updateThoughts(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then(() =>
                !Thoughts
                    ? res.status(404).json({ message: 'No user with this id!' })
                    : res.json(thoughts)
            )
            .catch((err) => res.status(500).json(err));
    },

    // Add a reaction
    addReaction(req, res) {
        console.log('You are adding a friend');
        console.log(req.body);
        Thoughts.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.thoughtId } },
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
            { $pull: { friends: { friendsId: req.params.thoughtId } } },
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
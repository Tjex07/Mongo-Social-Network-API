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
        Thoughts.findOne({ _id: req.params.thoughtsId })
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
        Thoughts.findOneAndDelete({ _id: req.params.thoughtsId })
                .then(() => res.json({ message: 'thoughts deleted!' }))
                .catch((err) => res.status(500).json(err));
    },

    // Update a Thought
    updateThoughts(req, res) 
    {
      Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtsId },
        req.body, { runValidators: true, new: true })
       
        .then(
          res.json('Thoughts successfully updated!')
      )
      .catch((err) => {
          console.log(err);
          res.status(500).json(err);
      });
  },
    

    // Add a reaction
    addReaction(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtsId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res
                        .status(404)
                        .json({ message: 'No thought found with that ID :(' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Remove a reaction
    removeReaction(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtsId },
            { $pull: { reactions: { reactionId: req.params.reactionsId } } },
            { runValidators: true, new: true }
        )
            .then((reactions) =>
                !reactions
                    ? res
                        .status(404)
                        .json({ message: 'No Reaction found with that ID :(' })
                    : res.json(reactions)
            )
            .catch((err) => res.status(500).json(err));
    },
};

// module.exports = thoughtsController;
const thought_route = require('express').Router()
const { User, Thought } = require('../../models')


//Create a thought
thought_route.post('/thoughts', async (req, res) => {
  try {
    const { userId, thoughtText } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'No user found' });
    }
    const newThought = await Thought.create({
      thoughtText,
      username: user.username,
      userId: user._id
    });

    res.status(202).json(newThought);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal server error' })
  }
});

//Get all thoughts
thought_route.get('/thoughts', async (req, res) => {
  try {
    const allThoughts = await Thought.find();

    res.status(202).json(allThoughts);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal server error' })
  }
});

//Get thought by ID
thought_route.get('/thoughts/:id', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id);
    if (!thought) {
      return res.status(404).json({ message: 'No thought found' });
    }
    res.status(202).json(thought);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal server error' })
  }
});

//Update thought by ID
thought_route.put('/thoughts/:id', async (req, res) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedThought) {
      return res.status(404).json({ message: 'No thought found' });
    }
    res.status(202).json(updatedThought);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal server error' })
  }
});

///delete thought by id
thought_route.delete('/thoughts/:id', async (req, res) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.id);
    if (!thought) {
      return res.status(404).json({ message: 'No thought found' });
    }
    res.status(202).send();
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal server error' })
  }
});


//Create a new reaction
thought_route.post('/thoughts/:thoughtId/reactions', async (req, res) => {
    try {
        const thoughtId = req.params.thoughtId
        const newReactionData = req.body
        const newReaction = await Thought.findOneAndUpdate(
            { _id: thoughtId },
            { $push: { reactions: newReactionData } },
            { new: true }
        )
        res.status(202).json(newReaction)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' })
      }
})

//Delete reaction by id
thought_route.delete('/thoughts/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
        const thoughtId = req.params.thoughtId
        const reactionId = req.params.reactionId
        await Thought.findOneAndUpdate(
            { _id: thoughtId },
            { $pull: { reactions: { reactionId: reactionId } } },
            { new: true }
        )

        res.status(202).json({ message: 'Reaction has been deleted' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' })
      }
})

module.exports = thought_route;

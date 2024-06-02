const user_route = require('express').Router()
const { User } = require('../../models')


//Create
user_route.post('/users', async (req, res) => {
    try {
      const newUser = await User.create(req.body);

      res.status(202).json(newUser);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' })
      }
  });
  
  //Get all
  user_route.get('/users', async (req, res) => {
    try {
      const allUsers = await User.find();
      res.status(202).json(allUsers);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' })
    }
  });
  
  //Get User by ID
  user_route.get('/users/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.json({ message: 'No user found' });
      }
      res.status(202).json(user);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' })
    }
  });
  
  //Update User by ID
  user_route.put('/users/:id', async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedUser) {
        return res.json({ message: 'No user found' });
      }
      res.status(202).json(updatedUser);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' })
    }
  });
  
  //Delete User by ID
  user_route.delete('/users/:id', async (req, res) => {
    try {
      const user = await User.findByIdAndRemove(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'No user found' });
      }
      res.status(202).send();
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' })
    }
  });


  //need to update friends
  
  //add friend to user
user_route.post('/users/:userId/friends/:friendId', async (req, res) => {
    try {
        const userId = req.params.userId
        const friendId = req.params.friendId
        const addFriend = await User.findOneAndUpdate(
            { _id: userId },//find user by id
            { $addToSet: { friends: friendId } }, //set friendId into friends array 
            //$addToSet is used to prevent duplicate friends
            { new: true } //return updated user
        )
        res.status(202).json(addFriend)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' })
    }
})

//remove friend from user
user_route.delete('/users/:userId/friends/:friendId', async (req, res) => {
    try {
        const userId = req.params.userId
        const friendId = req.params.friendId
        await User.findOneAndUpdate(
            { _id: userId },
            { $pull: { friends: friendId } },
            { new: true }
        )
        //return updated user
        res.status(202).json({ message: 'Friend removed' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' })
    }
})


  module.exports = user_route
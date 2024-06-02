const { model, Schema } = require('mongoose')


const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "You must enter a username"],
        minlength: [3, "Your username must be at least 3 characters long"]
    },

    email: {
        type: String,
        unique: true,
        required: [true, "A valid email must be entered"],
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
    },

    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },

    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'thought'
        }
    ],

}, {
    toJSON: {
        virtuals: true,
    },

}

)

userSchema.virtual('friendCount')
    .get(function () {
        return this.friends.length
    })


const User = model('User', userSchema);

module.exports = User
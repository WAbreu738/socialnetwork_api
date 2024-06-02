const { model, Schema, Types } = require('mongoose')


const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
}, {
    toJSON: {
        virtuals: true
    },
    id: false,
    timestamps: true

})

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },

    username: {
        type: String,
        required: true
    },

    reactions: [reactionSchema]
}, {
    toJSON: {
        virtuals: true
    },

    id: false,
    timestamps: true
})


const Thought = model('Thought', thoughtSchema)

module.exports = Thought
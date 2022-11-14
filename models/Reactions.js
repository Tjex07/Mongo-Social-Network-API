const { Schema, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionsSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            max_length: 280,
            min_length: 1,
        },
        userName: {
            type: String,
            required: true,
            unique: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            getters: dateFormat,
            timeStamp: true,
        }
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        }
    }
);




module.exports = ReactionsSchema
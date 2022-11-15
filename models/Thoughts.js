const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const ReactionsSchema = require('./Reactions');


const ThoughtsSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            max_length: 280,
            min_length: 1,
        },
        createdAt: {
            type: Date,
            default: Date.now,
           getters: dateFormat,
        },
        userName: {
            type: String,
            required: true,
        
        },
        reactions: [ReactionsSchema],
    }, 
    { 
        toJSON: {
            getters:true,
            virtuals: true,
        },
        id:false,
    }
);

ThoughtsSchema.virtual('reactionCount').get(function () {
        return this.reactions.length;
    });

const Thoughts = model('Thoughts', ThoughtsSchema)

module.exports = Thoughts
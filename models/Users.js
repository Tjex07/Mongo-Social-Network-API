const { Schema, model } = require('mongoose');

const usersSchema = new Schema(
    {
        userName: {
            type: String,
            required: true,
            maxlength: 26,
            minlength: 2,
            default: 'Anonymous User',
            unique: true
        },
        userEmail: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Input must be an email address!']
        },
        userThoughts: {
            type: Schema.Types.ObjectId,
            ref: 'Thoughts'
        },
        userFriends: {
            type: Schema.Types.ObjectId,
            ref: 'Users',
        }
    },
    {
        toJSON: {
            getters: true,
        },
        id: false
    });

usersSchema
    .virtual('friendCount')
    .get(function () {
        return this.userFriends.length;
    });

const Users = model('Users', usersSchema)

module.exports = Users
const { Schema, model } = require('mongoose');

const usersSchema = new Schema(
    {
        userName: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        userEmail: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Input must be an email address!']
        },
        userThoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thoughts'
        }],
        userFriends: [{
            type: Schema.Types.ObjectId,
            ref: 'Users',
        }]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false
    });

usersSchema
    .virtual('friendsCount')
    .get(function () {
        return this.userFriends?.length;
    });

const Users = model('Users', usersSchema)

module.exports = Users
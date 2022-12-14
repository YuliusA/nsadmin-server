const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    name: {
        Firstname: {
            type: String,
            required: true
        },
        Lastname: {
            type: String,
            required: true
        }
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Editor: Number,
        Admin: Number
    },
    notes: [{
        type: Schema.Types.ObjectId,
        ref: 'Note'
    }],
    refreshToken: String
});

module.exports = mongoose.model('User', userSchema);
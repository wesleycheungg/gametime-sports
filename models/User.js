const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    handle: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    currency: {
        type: Number,
        required: true 
    },
    history: []
    }, {
    timestamps: true
});

const User = mongoose.model('users', UserSchema);

module.exports = User;
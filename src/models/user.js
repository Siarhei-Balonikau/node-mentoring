import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    login: String,
    password: String
});

module.exports = mongoose.model('User', UserSchema);

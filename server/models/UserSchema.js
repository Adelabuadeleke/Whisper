const mongoose = require('mongoose');

// user schema 
const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
});

UserSchema.index({ email: 1 }, { unique: true });

const User = mongoose.model('User', UserSchema);
module.exports = User;

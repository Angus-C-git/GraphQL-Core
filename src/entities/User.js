const mongoose = require('mongoose');

/**
 * @USER ENTITY DEFINITION
 * */
const userSchema = new mongoose.Schema({
	usrName: {
		type: String,
		required: true,
		min: 6,
		max: 25
	},
	email: {
		type: String,
		required: true,
		max: 255,
		min: 6
	},
	password: {
		type: String,
		required: true,
		min: 6
	},
	createdDate: {
		type: Date,
		default: Date.now
	}
});


module.exports = mongoose.model('User', userSchema);
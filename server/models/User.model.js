import mongoose from 'mongoose';
import uuid from 'node-uuid';

const UserSchema = new mongoose.Schema({
	id: {
		type: String,
		default: uuid.v4,
	},
	profile: {
		type: String,
	},
	mobile: {
		type: String,
		maxLength:10,
		minLength:7
	},
	email: {
		type: String,
		minlength: 5,
		maxLength: 320,
		required: [true,"please provide valid email"],
		unique: [true,"Email already exists"],
	},
	username: {
	    type: String,
        required: [true,"Please provide an unique username"],
	    minLength: 3,
		unique: [true,"Username already taken"],
	},
	password: {
		type: String,
        required: [true,"Please provide a password"],
        unique: false,
	},
	firstName: {
		type: String,
		minLength: 3,
		required: false,
	},
	lastName: {
		type: String,
		minLength: 1,
		required: false,
	},
	address: {
		type: String,
		required: false,
	},
	isDeleted: {
		type: Boolean,
		default: false,
	},
	createdDate: {
		type: Date,
		default: Date.now(),
	},
	lastModifiedDate: {
		type: Date,
		default: Date.now(),
	},
	passwordBlockedTill: {
		type: Date,
		default: Date.now(),
	}
});

export default mongoose.model("User",UserSchema);


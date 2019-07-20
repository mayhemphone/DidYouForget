let mongoose = require('mongoose')

let repsSchema = new mongoose.Schema({
	name: {
		type: String,
		required:false
	},
	seat: {
		type: String,
		required:false
	},
	twitter: {
		type: String,
		required: false
	},
	v_2010_h_1: {
		type: String,
		required:false
	},
	v_2010_h_2: {
		type: String,
		required:false
	},
	v_2010_h_3: {
		type: String,
		required:false
	},
	v_2015_b_1: {
		type: String,
		required:false
	},
	v_2019_h_1: {
		type: String,
		required:false
	},
	v_2010_s_1: {
		type: String,
		required:false
	},
	v_2019_s_1: {
		type: String,
		required:false
	}	

});

module.exports = mongoose.model('Reps', repsSchema)
const mongoose = require('mongoose');

let blogEntrySchema = new mongoose.Schema({
	title: String,
	content: String,
	author: {
		firstName: String,
		lastName: String
	},
	created: Date
})

blogEntrySchema.virtual('fullName').get(function() {
	console.log(this)
	return `${this.author.firstName} ${this.author.lastName}`
});


blogEntrySchema.methods.apiRepr = function() {
	return {
		title: this.title,
		content: this.content,
		author: this.fullName,
		created: this.created
	};
}



module.exports = mongoose.model('blogEntries', blogEntrySchema);
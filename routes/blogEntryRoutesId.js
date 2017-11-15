const express = require('express')
const blogEntry = require('../models')
const router = express.Router();

router.get('/:id', (req, res) => {
    blogEntry.findById(req.params.id).then((item) => {
            console.log('get with id request')
            res.json(item.apiRepr()).status(200)
        })
        .catch(() => {
            console.log('inside of catch');
            res.status(400).send('Something happened');
        });
});

router.put('/:id', (req, res) => {
    if (!(req.params.id && req.body.id && req.params.id == req.body.id)) {
        return res.send(`your request ID :${req.body.id} must match the blog ID :${req.body.id}`)
    }
    let editOptions = ['title', 'content', 'author'];
    let editField = {}

    editOptions.forEach((field) => {
        if(field in req.body) {
            editField[field] = req.body[field]
        }
    });

	blogEntry.findByIdAndUpdate(req.params.id, { $set: editField }, {new: true})
		.then((item) => {
    		res.json(item.apiRepr()).status(200)	
		})
		.catch(() => {
    		console.log('inside of catch');
    		res.status(400).send('Something happened');
	});	
});

router.delete('/:id', (req, res) => {
	//if(!(req.params.id == req.body.id)){
	//	return res.send(`your request ID ${req.params.id} must match your blog ID ${req.body.id}`)
	//}
	if(!req.params.id){
		return res.send('Please inclide a valid blog ID')
	}
	blogEntry.findByIdAndRemove(req.params.id)
	
	.then((item) => {
		console.log('delete request processing')
		res.send(`your ${item} blog has been removed`).status(204)
	})
	.catch(() => {
    	console.log('inside of catch');
    	res.status(400).send('Something happened');
    });	

});

module.exports = router;
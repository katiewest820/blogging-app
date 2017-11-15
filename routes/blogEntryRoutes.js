const express = require('express')
const blogEntry = require('../models')
const router = express.Router();

// router.use(function(req, res, next) { console.log("route middleware");
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next(); 
// });

router.get('/', (req, res) => {
    console.log('this is a get request')
    blogEntry.find({}).then((items) => {
            res.json(items.map((x) => {
                return x.apiRepr()
            })).status(200);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Something happened');
        });
});

router.post('/', (req, res) => {
    const requiredFields = ['title', 'content', 'author'];
    for (let i = 0; i < requiredFields.length; i++) {
        let field = requiredFields[i];
        if (!(field in req.body)) {

            return res.send(`you are missing ${field}`).status(400);
        }
        console.log(req)
    }
    blogEntry
        .create({
            title: req.body.title,
            content: req.body.content,
            author: {
                firstName: req.body.author.firstName,
                lastName: req.body.author.lastName
            },
            created: req.body.created
        })
        .then((blogEntry) => {
            console.log('post request')
            res.status(201).json(blogEntry.apiRepr())

        })
        .catch(() => {
            console.log('inside of catch');
            res.status(500).send('Something happened');
        });
});

module.exports = router;
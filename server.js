const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Promise = require('bluebird');


const app = express();

const { PORT, DATABASE_URL } = require('./config');
const {blogEntry} = require('./models');
const blogRoutes = require('./routes/blogEntryRoutes');
const blogRoutesId = require('./routes/blogEntryRoutesId');
mongoose.Promise = Promise;

app.use(bodyParser.json());

app.all('/');
app.use('/posts', blogRoutes);
app.use('/posts/id', blogRoutesId);




let server

function runServer(databaseUrl=DATABASE_URL, port=PORT) {
    return new Promise((resolve, reject) => {
        mongoose.connect(databaseUrl, { useMongoClient: true });
        let db = mongoose.connection;
        db.on('error', err => {
            mongoose.disconnect();
            reject(err);
            console.log(`Connection error:${err}`);
        });
        db.once('open', () => {
            console.log(`Connected to a database ${databaseUrl}`)
        });
        server = app.listen(port, () => {
            console.log(`your server is running on port: ${PORT}`);
            resolve();
        });
    });
}

function closeServer(){
	return mongoose.disconnect().then(() => {
		return new Promise((resolve, reject) => {
			console.log('closing server');
			server.close(err => {
				if(err) {
					return reject(err);
				}
				resolve();
			})
		});
	});
}

if(require.main === module) {
	runServer().catch(err => console.log(err));
};

module.exports = { app, runServer, closeServer };
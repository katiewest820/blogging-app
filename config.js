exports.PORT = process.env.PORT || 8080;


exports.DATABASE_URL = process.env.DATABASE_URL ||
						global.DATABASE_URL ||
						`mongodb://admin:password@ds259245.mlab.com:59245/blog-app`;
const AWS = require('aws-sdk');
AWS.config.loadFromPath('./config/awsCredentials.json');

module.exports = AWS;

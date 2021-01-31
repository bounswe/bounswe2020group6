const elastic = require('elasticsearch')

// connect to elastic client using parameters in the env file.
const elasticClient = new elastic.Client({
    host: process.env.ELASTIC_HOST,
    log: 'trace'
})

module.exports = {
    elasticClient,
}
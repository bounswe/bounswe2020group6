const elastic = require('elasticsearch')

const elasticClient = new elastic.Client({
    host: process.env.ELASTIC_HOST,
    log: 'trace'
})

module.exports = {
    elasticClient,
}
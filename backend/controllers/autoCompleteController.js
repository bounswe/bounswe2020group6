const { User, Tag, University, Department, Title, Interest } = require('../model/db');
  
getTitles = async function (req, res) {
    try {
        titles = await Title.findAll()
        res.status(200).send(titles)
    } catch (error) {
        res.status(500).send(error)
    }
}

getDepartments = async function (req, res) {
    try {
        departments = await Department.findAll()
        res.status(200).send(departments)
    } catch (error) {
        res.status(500).send(error)
    }
}

getTags = async function (req, res) {
    try {
        tags = await Tag.findAll()
        res.status(200).send(tags)
    } catch (error) {
        res.status(500).send(error)
    }
}

getUniversities = async function (req, res) {
    try {
        universities = await University.findAll()
        res.status(200).send(universities)
    } catch (error) {
        res.status(500).send(error)
    }
}

getInterests = async function (req, res) {
    try {
        interests = await Interest.findAll()
        res.status(200).send(interests)
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    getTitles,
    getDepartments,
    getTags,
    getUniversities,
    getInterests,
}
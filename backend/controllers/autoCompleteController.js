const { User, Tag, University, Department, Title, Interest } = require('../model/db');

addTitle = async function (req, res) {
    title=req.body.title
    console.log("title: ", title)

    if(title != null & title!=""){
        try {
            addedTitle = await Title.create({title: title})
            res.status(200).send({message: "Title is created", title: addedTitle.title})
        } catch (error) {
            res.status(500).send(error.message)
        }
    }
    return res.status(404).send({message: "Erroronous Input"})

}

addDepartment = async function (req, res) {
    department=req.body.department
    console.log("department: ", department)

    
    if(department != null & department!=""){
        try {
            addedDepartment = await Department.create({department: department})
            res.status(200).send({message: "Department is created", department: addedDepartment.department})
        } catch (error) {
            res.status(500).send(error.message)
        }
    }
    return res.status(404).send({message: "Erroronous Input"})

}

addTag = async function (req, res) {
    tag=req.body.tag
    console.log("tag: ", tag)

    if(tag != null & tag!=""){
        try {
            addedTag = await Tag.create({tag: tag})
            res.status(200).send({message: "Tag is created", tag: addedTag.tag})
        } catch (error) {
            res.status(500).send(error.message)
        }
    }
    return res.status(404).send({message: "Erroronous Input"})

}

addUniversity = async function (req, res) {
    university=req.body.university
    console.log("university: ", university)

    if(university != null & university!=""){
        try {
            addedUniversity = await University.create({university: university})
            res.status(200).send({message: "University is created", university: addedUniversity.university})
        } catch (error) {
            res.status(500).send(error.message)
        }
    }
    return res.status(404).send({message: "Erroronous Input"})
}

addInterest = async function (req, res) {
    interest=req.body.interest
    console.log("interest: ", interest)

    if(interest != null & interest!=""){
        try {
            addedInterest = await Interest.create({interest: interest})
            res.status(200).send({message: "Interest is created", interest: addedInterest.interest})
        } catch (error) {
            res.status(500).send(error.message)
        }
    }
    return res.status(404).send({message: "Erroronous Input"})

}

getTitles = async function (req, res) {
    try {
        titles = await Title.findAll({attributes: ['title']})
        var array=[]
        
        for(var i in titles)
            array.push(titles[i]["title"]);
        res.status(200).send({result: array})
    } catch (error) {
        res.status(500).send(error.message)
    }
}



getDepartments = async function (req, res) {
    try {
        departments = await Department.findAll({attributes: ['department']})
        var array=[]
        
        for(var i in departments)
            array.push(departments[i]["department"]);
        res.status(200).send({result: array})
    } catch (error) {
        res.status(500).send(error.message)
    }
}

getTags = async function (req, res) {
    try {
        tags = await Tag.findAll({attributes: ['tag']})
        var array=[]
        
        for(var i in tags)
            array.push(tags[i]["tag"]);
        res.status(200).send({result: array})

    } catch (error) {
        res.status(500).send(error.messge)
    }
}

getUniversities = async function (req, res) {
    try {
        universities = await University.findAll({attributes: ["university"]})
        var array=[]
        
        for(var i in universities)
            array.push(universities[i]["university"]);
        res.status(200).send({result: array})


    } catch (error) {
        res.status(500).send(error.message)
    }
}

getInterests = async function (req, res) {
    try {
        interests = await Interest.findAll({attributes: ["interest"]})
        var array=[]
        
        for(var i in interests)
            array.push(interests[i]["interest"]);
        res.status(200).send({result: array})

    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = {
    getTitles,
    getDepartments,
    getTags,
    getUniversities,
    getInterests,
    addTitle,
    addDepartment,
    addTag,
    addUniversity,
    addInterest
}
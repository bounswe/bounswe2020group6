const { User, EventTag,  Event, sequelize } = require('../model/db');

const eventData = 
    [
        {
            model: EventTag,
            attributes: ["tag"] 
        },
        {
            model: User,
            attributes: ['id', 'name','surname','university','department', 'profile_picture_url']
        }
    ]

addEvent = async function (req, res) {
    
    const event = {
        userId : req.body.userId,
        type : req.body.type,
        isPublic : req.body.isPublic,
        title : req.body.title,
        body : req.body.body,
        link : req.body.link,
        location : req.body.location,
        date : req.body.date,
        other : req.body.other,
    }

    //Using transaction system to safely protect relations between EventTag-Tag tables
    const transaction = await sequelize.transaction()
    try {
        const addedEvent = await Event.create( event, { transaction } )
        
        for await (var i of req.body.tags)
            EventTag.create( { id: addedEvent.id, tag: req.body.tags[i], },{ transaction } )    
        
        await transaction.commit()
        
        res.status(200).send({message: "Event is created", event: addedEvent})
        
    } catch (error) {
        await transaction.rollback()
        res.status(500).send(error.message)
    }
}


getEvents = async function (req, res) {
    try {
        events = await Event.findAll({ include: eventData })
        res.status(200).send({result: events})
    } catch (error) {
        res.status(500).send(error.message)
    }
}


module.exports = {
    addEvent,
    getEvents,
    getEvent,
    updateEvent,
}
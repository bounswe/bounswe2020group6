const { User, EventTag,  Event, sequelize } = require('../model/db');
const { Op } = require("sequelize");

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
        
        for (var tag of req.body.tags)
            await EventTag.create( { id: addedEvent.id, tag }, { transaction } )    
        
        await transaction.commit()
        
        res.status(200).send({message: "Event is created", event: addedEvent})
        
    } catch (error) {
        await transaction.rollback()
        res.status(500).send(error.message)
    }
}


getEvents = async function (req, res) {
    try {
        events = await Event.findAll({ 
            where: { 
                [Op.or]: [{isPublic: 1}, {userId: req.userId}]
            }, 
            include: eventData
        })
        res.status(200).send({result: events})
    } catch (error) {
        res.status(500).send(error.message)
    }
}

getEvent = async function (req, res) {
    try {
        events = await Event.findOne({ where: { id: req.params.id }, include: eventData })
        res.status(200).send({result: events})
    } catch (error) {
        res.status(500).send(error.message)
    }
}

searchEvents = async function (req, res) {
    const query = req.body.filters;
    if('isPublic' in query) delete query.isPublic
    query[Op.or] = [{isPublic: 1}, {userId: req.userId}]
    try {
        events = await Event.findOne({ where: query, include: eventData })
        res.status(200).send({result: events})
    } catch (error) {
        res.status(500).send(error.message)
    }
}

updateEvent = async function (req, res) {
    const toUpdate = req.body.update;
    let tags, id = req.params.id;
    if ( !id ) return res.status(400).send( {error: "you have to provide an id"} )
    if ( 'userId' in toUpdate ) return res.status(400).send( {error: "cannot change userid of event"} )
    if ( 'tags' in toUpdate ) { tags = toUpdate.tags; delete toUpdate.tags }

    const transaction = await sequelize.transaction()

    try {
        thisEvent = await Event.findOne( { where: {id} } )
        if(!thisEvent) throw new Error('event with given id does not exist.')
        if(thisEvent.userId != req.userId) throw new Error('you cannot update this event')
        console.log(thisEvent.userId);
        
        await Event.update( toUpdate, { where: {id} }, { transaction } )

        if (tags) {
            await EventTag.destroy( { where: {id} }, { transaction } ) 

            for (var tag of tags)
                await EventTag.create( { id, tag }, { transaction } ) 
        }
        
        await transaction.commit()

        res.status(200).send("success!")
    } catch (error) {
        
        await transaction.rollback()
        
        res.status(500).send(error.message)
    }
}


module.exports = {
    addEvent,
    getEvents,
    getEvent,
    searchEvents,
    updateEvent,
}
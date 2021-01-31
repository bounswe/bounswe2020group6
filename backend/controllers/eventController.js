const { User, EventFav, EventTag,  Event, sequelize } = require('../model/db');
const { Op } = require("sequelize");
const elasticUtil = require("../elastic/elasticUtil")

/**
 * this is a model that is included in event queries
 * also returns whether an event is favorited by the given user
 * @param {number} id userId of given user
 */
const eventData = function (id) {
    data = 
    [
        {
            model: EventTag,
            attributes: ["tag"] 
        },
        {
            model: User,
            attributes: ['id', 'name','surname','university','department', 'profile_picture_url']
        },
        {
            model: EventFav,
            where: { 
                userId: id
            },
            required: false
        }
    ]
    return data
} 
    
/**
 * creates a new event, expected fields are
 * userId, type, isPublic, title, body, link, location, date, other
 * all except userId can be null, but still need to be passed
 */
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

        try{
            elasticUtil.addEvent(addedEvent)
        }
        finally{
            res.status(200).send({message: "Event is created", event: addedEvent})
        }
        
    } catch (error) {
        await transaction.rollback()
        res.status(500).send(error.message)
    }
}

/** returns all events */
getEvents = async function (req, res) {
    try {
        events = await Event.findAll({ 
            where: { 
                [Op.or]: [{isPublic: true}, {userId: req.userId}]
            }, 
            include: eventData(req.userId)
        })
        await events.forEach( e => e.dataValues.isFavable = (e.event_favs.length === 1) ? false : true )
        res.status(200).send({result: events})
    } catch (error) {
        res.status(500).send(error.message)
    }
}

/** returns a specific event */
getEvent = async function (req, res) {
    try {
        events = await Event.findOne({ where: { id: req.params.id }, include: eventData(req.userId) })
        events.dataValues.isFavable = (events.event_favs.length === 1) ? false : true
        res.status(200).send({result: events})
    } catch (error) {
        res.status(500).send(error.message)
    }
}

/** filters events */
searchEvents = async function (req, res) {
    const query = req.body.filters;
    if('isPublic' in query) delete query.isPublic
    query[Op.or] = [{isPublic: true}, {userId: req.userId}]
    try {
        events = await Event.findAll({ where: query, include: eventData(req.userId) })
        await events.forEach( e => e.dataValues.isFavable = (e.event_favs.length === 1) ? false : true )
        res.status(200).send({result: events})
    } catch (error) {
        res.status(500).send(error.message)
    }
}

/**updates a specific event */
updateEvent = async function (req, res) {
    const toUpdate = req.body.update;
    let tags, id = req.params.id;
    if ( !id ) return res.status(400).send( {error: "you have to provide an id"} )
    if ( 'userId' in toUpdate ) return res.status(400).send( {error: "cannot change userid of event"} )
    if ( 'tags' in toUpdate ) { tags = toUpdate.tags; delete toUpdate.tags }

    const transaction = await sequelize.transaction()

    try {
        const thisEvent = await Event.findOne( { where: {id} } )
        if(!thisEvent) throw new Error('event with given id does not exist.')
        if(thisEvent.userId != req.userId) throw new Error('you cannot update this event')
        console.log(thisEvent.userId);
        
        await Event.update( toUpdate, { where: {id} }, { transaction } )
        eventToUpdate = await Event.findOne({
            where: {
                id: req.params.id
            }
        })
        if (tags) {
            await EventTag.destroy( { where: {id} }, { transaction } ) 

            for (var tag of tags)
                await EventTag.create( { id, tag }, { transaction } ) 
        }
        
        await transaction.commit()
        
        try {
            elasticUtil.updateEvent(eventToUpdate)
        }
        finally{
            res.status(200).send("success!")
        }

    } catch (error) {
        
        await transaction.rollback()
        
        res.status(500).send(error.message)
    }
}

/**favorites an event */
favEvent = async function (req, res) {
    const userId = req.userId
    const eventId = req.body.id
    try {
        let [thisEvent, isFaved] = await Promise.all([
            Event.findOne( {where: {id: eventId}} ),
            EventFav.findOne( {where: {userId, eventId}} )
        ])

        if(!thisEvent) throw new Error('event with given id does not exist.')
        if(isFaved) throw new Error('this event is already faved by this user')

        await EventFav.create( {userId, eventId} )

        res.status(200).send("success")
    } catch (error) {
        res.status(500).send(error.message)
    }
}

/**unfavorites an event */
unfavEvent = async function (req, res) {
    const userId = req.userId
    const eventId = req.body.id
    try {
        let [thisEvent, isFaved] = await Promise.all([
            Event.findOne( {where: {id: eventId}} ),
            EventFav.findOne( {where: {userId, eventId}} )
        ])

        if(!thisEvent) throw new Error('event with given id does not exist.')
        if(!isFaved) throw new Error('this event is not faved by this user')

        await EventFav.destroy( {where: {userId, eventId}} )

        res.status(200).send("success")
    } catch (error) {
        res.status(500).send(error.message)
    }
}

/**deletes an event */
deleteEvent = async function (req, res) {
    const userId = req.userId
    const id = req.body.id
    try {
        const deleted = await Event.destroy( {where: {id, userId}} )
        if(deleted == 0) throw new Error('Nothing is deleted, either you are not the owner or this event does not exist')

        try{
            elasticUtil.deleteEvent(id)
        }
        finally{
            res.status(201).send("success")

        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

/**returns all events favorited by this user */
listFavEvents = async function (req, res) {
    const userId = req.query.userId
    try {
        let events = await EventFav.findAll({
            where:{
                userId
            },
            include: {
                model: Event,
                include: eventData(userId)
            }
        })

        events = events.map( e => e.event )

        res.status(200).send({result: events})

    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = {
    addEvent,
    getEvents,
    getEvent,
    searchEvents,
    updateEvent,
    favEvent,
    unfavEvent,
    deleteEvent,
    listFavEvents,
}

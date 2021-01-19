const { User, EventTag, Tag, Event, sequelize } = require('../model/db');

addEvent = async function (req, res) {
    
    event={
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
    const t = await sequelize.transaction()
    try {
        addedEvent = await Event.create(event,{transaction : t})
        
        tags=req.body.tags
        for(var i in tags)
            await EventTag.create({
                id: addedEvent.id,
                tag: tags[i],
            },{transaction : t})    
        await t.commit()
        res.status(200).send({message: "Event is created", event: addedEvent})
        
    } catch (error) {
        await t.rollback()
        res.status(500).send(error.message)
    }

}


getEvents = async function (req, res) {
    try {
        events = await Event.findAll({
            include: [
                {
                    model: EventTag,
                    attributes: ["tag"] 
                }
                ]
            })
        res.status(200).send({result: events})
    } catch (error) {
        res.status(500).send(error.message)
    }
}



module.exports = {
    addEvent,
    getEvents,
}
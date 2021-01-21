module.exports = (sequelize, Seq) => {
    return sequelize.define('notification', {
	id : {
	    type : Seq.INTEGER,
	    primaryKey: true,
	    autoIncrement: true,
	},
	projectId : {
	    type : Seq.INTEGER,
	    allowNull : false,
	},
	type :{
	    type : Seq.INTEGER,
	    allowNull : false,
	},
	accepterId : {
	    type : Seq.INTEGER,
	    allowNull : false,
	},
	participantId : {
	    type : Seq.INTEGER,
	    allowNull : false,
	},
	receiverId : {
	    type : Seq.INTEGER,
	    allowNull : false,
	},
	body : {
	    type : Seq.TEXT,
	    allowNull : false,
	},
	}, 
    {
        timestamps : true
    })
}

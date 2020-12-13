module.exports = (sequelize, Seq) => {
    return sequelize.define('collab_request', {
	id : {
	    type : Seq.INTEGER,
	    primaryKey: true,
	    autoIncrement: true,
	},
	requesterId : {
	    type : Seq.INTEGER,
	    allowNull : false,
	},
	requestedId :{
	    type : Seq.INTEGER,
	    allowNull : false,
	},
	projectId : {
	    type : Seq.INTEGER,
	    allowNull : false,
	},
	}, 
    {
        timestamps : true
    })
}

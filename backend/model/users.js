module.exports = (sequelize, Seq) => {
    return sequelize.define('user', {
        id: {
          type: Seq.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        name: {
            type: Seq.STRING,
            allowNull: false,
        },
        surname:{
            type: Seq.STRING,
            allowNull: false,
        },
        profile_picture_url:{
            type: Seq.STRING,
            default: "none"
        },
        scholar_profile_url:{
            type: Seq.STRING,
        },
        email: {
            type: Seq.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: Seq.STRING,
            allowNull: false,
        },
        //validation code of user
        validation: Seq.STRING,
        //whether user is validated or not
        isValidated: Seq.BOOLEAN,
        university: {
            type: Seq.STRING
        },
        department:{
            type: Seq.STRING
        },
        title:{
            type: Seq.STRING
        },
        bio:{
            type: Seq.STRING
        },
        //citations of user in google scholar
        citations:{
            type: Seq.INTEGER
        },
        iIndex:{
            type: Seq.INTEGER
        },
        hIndex:{
            type: Seq.INTEGER
        },
        //last 5 year citations of user in google scholar
        last5Year_citations:{
            type: Seq.INTEGER
        },
        last5Year_iIndex:{
            type: Seq.INTEGER
        },
        last5Year_hIndex:{
            type: Seq.INTEGER
        },
        //projects of user in google scholar
        projects:{
            type: Seq.TEXT
        }
    }, 
    {   
        timestamps : true
    }
    )
}

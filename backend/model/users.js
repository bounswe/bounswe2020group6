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
        validation: Seq.STRING,
        isValidated: Seq.BOOLEAN,
        number_of_ups: Seq.INTEGER,
        university: {
            type: Seq.STRING,
            allowNull: false,
        },
        department:{
            type: Seq.STRING,
            allowNull: false,
        },
        title:{
            type: Seq.STRING,
            allowNull: false,
        },
        bio:{
            type: Seq.STRING,
            allowNull: false,
        },
        citations:{
            type: Seq.INTEGER,
            allowNull: false,
        },
        iIndex:{
            type: Seq.INTEGER,
            allowNull: false,
        },
        hIndex:{
            type: Seq.INTEGER,
            allowNull: false,
        },
        last5Year_citations:{
            type: Seq.INTEGER,
            allowNull: false,
        },
        last5Year_iIndex:{
            type: Seq.INTEGER,
            allowNull: false,
        },
        last5Year_hIndex:{
            type: Seq.INTEGER,
            allowNull: false,
        }
    }, 
    {   
        timestamps : true
    }
    )
}
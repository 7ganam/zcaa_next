
const { dbConnect } = require('../utils/dbConnect')
const { University } = require('../models/university')

var _ = require('lodash');
var ObjectId = require('mongodb').ObjectID;






const fetch_all_unies = async () => {
    await dbConnect()
    let uines = [];
    uines = await University.find({});
    return (uines)
}



const register_unies = async (unies) => {
    for (uni of unies) {
        let fetched_uni = await fetch_uni_or_create_new_one(uni.uni_name.value, uni.uni_name.label)
        uni.uni_ref = fetched_uni
        console.log(`uni`, uni)

    }

    return unies
}




const fetch_uni_or_create_new_one = async (uni_id, uni_label) => { // dont catch errors here .. errors should be handled in upper comps
    await dbConnect()

    let found_uni;



    if (ObjectId.isValid(uni_id)) { // only look in the data base if the uni_id is a valid mongodb id
        // -------------------- LOOK DATABASE FOR THE USER ------------------------

        found_uni = await University.find({ _id: uni_id })


    }

    if (found_uni == undefined || found_uni.length < 1) {// in some cases the uni is registered but the front end fails to fetch data and sends again ..this causes a duplicate uni ... this is to double check based on the value itself 

        found_uni = await University.find({ name: uni_label })

    }


    if (found_uni == undefined || found_uni.length < 1) {
        // case no uni found registerd already
        let created_uni = create_uni(uni_label)
        console.log(' created_uni ', created_uni);
        return (created_uni)
    }
    else {
        return (found_uni[0])
    }

}


const create_uni = async (uni_label) => {  // dont catch errors here .. errors should be handled in upper comps
    await dbConnect()
    let uni = { name: uni_label };
    let created_uni = null;
    created_uni = await University.create(uni);
    return (created_uni)
}













module.exports = { fetch_all_unies, register_unies }
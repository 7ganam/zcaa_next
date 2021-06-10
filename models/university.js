if (typeof window === 'undefined') {// make sure this runs only on server side 


    const mongoose = require('mongoose')
    const Schema = mongoose.Schema;



    const university_schema = new Schema({
        AD: {
            type: String,
            required: false,
            // unique: true
        },
        name: {
            type: String,
            required: true,
            // unique: true
        },



    });





    module.exports = { University: mongoose.models.University || mongoose.model('University', university_schema) }

}
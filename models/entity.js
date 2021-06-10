if (typeof window === 'undefined') {// make sure this runs only on server side 


    const mongoose = require('mongoose')
    const Schema = mongoose.Schema;



    const entity_schema = new Schema({

        name: {
            type: String,
            required: true,
            // unique: true
        },



    });





    module.exports = { Entity: mongoose.models.Entity || mongoose.model('Entity', entity_schema) }

}
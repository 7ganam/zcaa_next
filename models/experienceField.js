// import mongoose from 'mongoose'
const mongoose = require('mongoose')
const Schema = mongoose.Schema;




const experience_field_schema = new Schema({


    label: {
        type: String,
        required: true
    },

},
    {
        timestamps: true
    });


// export default mongoose.models.User || mongoose.model('User', User)

module.exports = { ExperiencField: mongoose.models.ExperiencField || mongoose.model('ExperiencField', experience_field_schema) }
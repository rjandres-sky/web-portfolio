const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SectionsSchema = new Schema ({
    division : {type : Schema.Types.ObjectId, ref : 'divisions'},
    section : String,
    description : String,
})

module.exports = mongoose.model('sections', SectionsSchema);
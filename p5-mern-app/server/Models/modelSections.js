const mongoose  = require("mongoose");
const Schema = mongoose.Schema

const SectionsSchema = new Schema({
    division : {type : Schema.Types.ObjectId, ref : 'divisions', required : true},
    section : { type : String, required : true},
    sectionDesc : { type : String, required : true}
})

module.exports = mongoose.model('sections', SectionsSchema)
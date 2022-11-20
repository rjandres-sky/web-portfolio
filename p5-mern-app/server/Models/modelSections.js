const mongoose  = require("mongoose");
const Schema = require(mongoose.Schema)

const SectionsSchema = new Schema({
    division : {type : Schema.Types.ObjectId, ref : 'divisions', required},
    section : { type : String, required},
    sectionDesc : { type : String, required}
})

module.exports = mongoose.model('sections', SectionsSchema)
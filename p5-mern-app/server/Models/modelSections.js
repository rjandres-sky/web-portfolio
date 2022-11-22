const mongoose  = require("mongoose");
const mongooseUniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema

const SectionsSchema = new Schema({
    division : {type : Schema.Types.ObjectId, ref : 'divisions', required : true},
    section : { type : String, required : true, unique : true},
    sectionDesc : { type : String, required : true}
})
SectionsSchema.plugin(mongooseUniqueValidator)
module.exports = mongoose.model('sections', SectionsSchema)
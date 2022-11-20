const mongoose  = require("mongoose");
const mongooseUniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema



const DivisionsSchema = new Schema({
    division : { type : String, required : true, unique : true},
    div_description : { type : String, required : true},
    sections : [{type : Schema.Types.ObjectId, ref: 'sections'}]
})
DivisionsSchema.plugin(mongooseUniqueValidator)

module.exports = mongoose.model('divisions', DivisionsSchema)
const mongoose  = require("mongoose");
const Schema = mongoose.Schema

const DivisionsSchema = new Schema({
    division : { type : String, required : true},
    div_description : { type : String, required : true},
    sections : [{type : Schema.Types.ObjectId, ref : 'sections'}]
})

module.exports = mongoose.model('divisions', DivisionsSchema)
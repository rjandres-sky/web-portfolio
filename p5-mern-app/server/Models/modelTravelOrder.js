const mongoose = require("mongoose");
const mongooseUniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema

const TravelOrderSchema = new Schema({
    employee : {type : Schema.Types.ObjectId, ref : 'users', required : true},
    travelorderno : {type : String},
    travelorderdate : {type : String},
    traveldate : {type : Object},
    objectives : {type : String},
    transpo : [{type : String}],
    itinerary : [{
        placetovisit : {type : String},
        purpose : {type : String},
        date : {type : String},
        departure : {type : String},
        arrival : {type : String}
    }],
    status : {type : String},
    createdby : {type : Schema.Types.ObjectId, ref : 'users', required:true},
    datecreated : {type : Date, default : Date.now}
})

module.exports = mongoose.model('travelorders', TravelOrderSchema)
const mongoose  = require("mongoose");
const mongooseUniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema

const UsersSchema = new Schema ({
    employee_id : { type : String, require: true, unique : true},
    name : {
        lastname : { type : String, require: true},
        firstname : { type : String, require: true},
        middlename :  String,
        extension :  String
    },
    position : { type : String, require: true},
    username : { type : String, require: true},
    password : { type : String, require: true},
    division : { type : Schema.Types.ObjectId, ref : 'divisions', require: true},
    section : { type : Schema.Types.ObjectId, ref : 'sections', require: true},
    isDivisionHead : {type : Boolean, default : false},
    isSectionHead : {type : Boolean, default : false},
    isAdmin : {type : Boolean, default : false}
})
UsersSchema.plugin(mongooseUniqueValidator)

module.exports = mongoose.model('users', UsersSchema)
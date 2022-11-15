const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema ({
    empid : String,
    name : {lastname : String, firstname: String, middlename: String},
    position : String,
    section : {type : Schema.Types.ObjectId, ref : 'divisions.sections'},
    username : String,
    password : String,
    role : String,
    divionhead : Boolean,
    sectionhead : Boolean,
    isactive : Boolean
})

module.exports = mongoose.model('users', UsersSchema);

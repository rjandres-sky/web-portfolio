const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActionsSchema = new Schema({
    documentno : {type : Schema.Types.ObjectId, ref: 'documents'},
    action : Object, //use discriminator
    readStatus : Boolean,
    createdby : {type : Schema.Types.ObjectId, ref: 'users'},
    dateCreated : { type: Date, default: Date.now }
})

module.exports = mongoose.model('actions', ActionsSchema);
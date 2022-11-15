const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PRSchema = new Schema ({
    purpose : String,
    items : Array,
    total : String,
    requestedby : {type : Schema.Types.ObjectId, ref: 'users'}
})

const ActionsSchema = new Schema({
    action : Object, //use discriminator
    createdby : {type : Schema.Types.ObjectId, ref: 'users'},
    dateCreated : { type: Date, default: Date.now }
})

const DocumentsSchema = new Schema({
    documenttype : String,
    documentno : String,
    documentdate : String,
    section : {type : Schema.Types.ObjectId, ref: 'divisions'},
    document : PRSchema, //use discriminator
    actions : ActionsSchema,
    status : String,
    createdby : {type : Schema.Types.ObjectId, ref: 'users'},
    dateCreated: { type: Date, default: Date.now },
    dateUpdated: { type: Date, default: Date.now }
})

// const ForwardSchema = new Schema({
//     type : String,
//     destination : String,
//     message : String,
//     readstatus : Boolean
// })

// const ReceiveSchema = new Schema({
//     type : String,
//     message : String,
//     readstatus : Boolean
// })

// const ApprovedSchema = new Schema({
//   type : String,
//   message : String,
//   readstatus : Boolean  
// })

module.exports = mongoose.model('documents', DocumentsSchema);
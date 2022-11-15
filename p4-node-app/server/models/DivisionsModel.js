const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SectionsSchema = new Schema ({
    section_name : String,
    description : String,
})

const DivisionsSchema = new Schema ({
    division : String,
    description : String,
    Sections : [SectionsSchema]
})

module.exports = mongoose.model('divisions', DivisionsSchema);
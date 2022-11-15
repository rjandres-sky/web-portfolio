const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DivisionsSchema = new Schema ({
    division : String,
    description : String,
})

module.exports = mongoose.model('divisions', DivisionsSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shift = new Schema({
    fkUid: 'ObjectId',
    email: 'string',
    firstName: 'string',
    lastName: 'string',
    monday: 'string',
    tuesday: 'string',
    wednesday: 'string',
    thursday: 'string',
    friday: 'string',
    saturday: 'string',
    sunday: 'string'
});

module.exports = mongoose.model('shifts', shift);

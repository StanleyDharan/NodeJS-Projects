const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schedule = new Schema({
    effectiveWeek: 'string'
});

module.exports = mongoose.model('schedules', schedule)
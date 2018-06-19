const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shift = new Schema({
    fkUid: 'ObjectId',
    item: 'array',
    price: 'number',
    paymentType: 'string',
    custName: 'string',
    effectiveDate: 'string'
});

module.exports = mongoose.model('shifts', shift);

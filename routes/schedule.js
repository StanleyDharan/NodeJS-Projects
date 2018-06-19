let express = require('express');
let router = express.Router();
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const csv = require('csvtojson');
const Shift = require('../models/shifts-model');
const Schedule = require('../models/schedule-model');
const fs = require('fs');


//path to schedule storage
const filePath = path.resolve('.') + '/schedules/';

//file upload/storage
let storage = multer.diskStorage ({
    destination: function (req, file, cb) {
        cb(null, filePath);
    },
    filename: async function (req, file, cb) {
        cb(null, `TEMP`);
    }
});

let upload = multer({ storage: storage });

// JSON Parser
async function readJson (req, res, scheduleId){
    csv()
    .fromFile(filePath + req.file.filename)
    .on('json',(jsonObj)=>{
        const shift = new Shift({
            fkUid: mongoose.Types.ObjectId(scheduleId),
            item: jsonObj.Product,
            price: jsonObj.Price,
            paymentType: jsonObj.Payment_Type,
            custName: jsonObj.Name,
            effectiveDate: jsonObj.Date,
        });
        shift.save();
    })
    .on('done',(error)=>{
        if(error){
            console.log("error");
            res.render('error');
        }
        else {
            fs.renameSync(filePath + 'TEMP', filePath + scheduleId);
            console.log("Read complete!");
        }
    });
}



router.get('/:id', async function (req, res) {
    await mongoose.connect('mongodb://localhost:27017/Schedules').exec;
    await Shift.find({'fkUid': mongoose.Types.ObjectId(req.params.id)}).exec(async function (err, shift) {
        if(err){
            console.log(err);
            res.render('error');
        }else{
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.send(shift);
        }
    });
});

router.post('/submit', upload.single('ScheduleFile'), async function(req, res) {
    const schedule = new Schedule({effectiveWeek: `TEMP`});
    await mongoose.connect('mongodb://localhost:27017/Schedules').exec;
    await schedule.save();
    await Schedule.find({}).sort({'_id': -1}).limit(1).exec(async function (err, schedule) {
        await readJson(req, res, schedule[0]._id);
        // res.redirect(`/schedule/${schedule[0]._id}`);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(schedule[0]);
    });
});

module.exports = router;

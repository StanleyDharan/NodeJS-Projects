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
            email: jsonObj.Email,
            firstName: jsonObj.firstName,
            lastName: jsonObj.lastName,
            monday: jsonObj.Monday,
            tuesday: jsonObj.Tuesday,
            wednesday: jsonObj.Wednesday,
            thursday: jsonObj.Thursday,
            friday: jsonObj.Friday,
            saturday: jsonObj.Saturday,
            sunday: jsonObj.Sunday
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

router.get('/all', async function (req, res) {
    await mongoose.connect('mongodb://localhost:27017/Schedules').exec;
    await Schedule.find().sort({'_id': -1}).exec(async function (err, schedules) {
        if(err){
            console.log(err);
            res.send('error');
        } else {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.send(schedules);
        }
    });
});


router.get('/date?:date', async function (req, res){
    let shifts = [];
   await mongoose.connect('mongodb://localhost:27017/Schedules').exec;
   await Schedule.find({'effectiveWeek': req.query.date}, {'_id' : 1}).exec(async function (err, schedules) {
       if(err){
           console.log('error');
       }else{
           let promises = [];
           promises.push(Shift.find({'fkUid' : {$in : schedules}}).exec());
           const result = await Promise.all(promises);
           const shifts = await result.pop();
           res.setHeader('Access-Control-Allow-Origin', '*');
           res.send(shifts);
       }
   });
});

router.post('/submit', upload.single('ScheduleFile'), async function(req, res) {
    const schedule = new Schedule({effectiveWeek: `${req.body.DateEffective}`});
    await mongoose.connect('mongodb://localhost:27017/Schedules').exec;
    await schedule.save();
    await Schedule.find({}).sort({'_id': -1}).limit(1).exec(async function (err, schedule) {
        if(err){
            console.log('error!!!!:' + err);
        }else {
            await readJson(req, res, schedule[0]._id);
            res.send(schedule[0]._id);
        }
    });
});

module.exports = router;

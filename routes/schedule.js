let express = require('express');
let router = express.Router();
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const csv = require('csvtojson');

//global var
const base = path.resolve('.');
const filePath = base + '/schedules/';

//file upload/storage
let storage = multer.diskStorage ({
    destination: function (req, file, cb) {
        cb(null, filePath);
    },
    filename: function (req, file, cb) {
        cb(null, 'week_' + Date.now());
    }
});

let upload = multer({ storage: storage });


fileRead = function (req, res, next){
    csv()
    .fromFile(filePath + req.file.filename)
    .on('json',(jsonObj)=>{
        console.log(jsonObj);
    })
    .on('done',(error)=>{
        next();
    });
};

router.post('/submit', upload.single('ScheduleFile'), fileRead, function(req, res, next) {
    res.redirect("/");
});

module.exports = router;

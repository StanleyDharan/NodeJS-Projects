let express = require('express');
let router = express.Router();
const multer = require('multer');
const path = require('path');
const lineReader = require('line-by-line');

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


function fileReadPromise(fileName){
    return new Promise((resolve, reject) => {
        lr = new lineReader(fileName);

        lr.on('line', function(line){
            console.log(line);
        });
    });
}


const extractData = function(req, res, next) {
    fileReadPromise(filePath + req.file.filename).then(next());
};

router.post('/submit', upload.single('ScheduleFile'), extractData,function(req, res, next) {
    res.redirect("/");
});

module.exports = router;

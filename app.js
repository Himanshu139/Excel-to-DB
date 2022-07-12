var express = require('express');
var database = require("./model/database");
var bodyParser = require('body-parser');
var path = require('path');
var XLSX = require('xlsx');
var multer = require('multer');
const ejs = require('ejs');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

var upload = multer({ storage: storage });

var app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.resolve(__dirname, 'public')));

app.get('/', (req, res) => {
    database.find((err, data) => {
        if (err) {
            console.log(err)
            console.log("FAILED")
        }
        else {
            if (data != '') {
                res.render('home', { result: data });
                console.log("SUCCESS");
            }
            else {
                res.render('home', { result: {} });
                console.log("Upload your document.");
            }
        }
    });
});


app.post('/', upload.single('excel'), (req, res) => {
    var excelsheet = XLSX.readFile(req.file.path);
    var list = excelsheet.SheetNames;
    var x = 0;
    list.forEach(element => {
        var xlData = XLSX.utils.sheet_to_json(excelsheet.Sheets[list[x]]);
        database.insertMany(xlData, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
            }
        })
        x++;
    });
    res.redirect('/');
});

app.listen(3000, () => console.log('server run at 3000'))

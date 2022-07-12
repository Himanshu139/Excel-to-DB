var mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/ExcelDB', { useNewUrlParser: true })
    .then(() => { console.log('connected to db') })
    .catch((error) => { console.log('error', error) });


var excelSchema = new mongoose.Schema({
    Name_of_the_Candidate: String,
    Email: String,
    Mobile_No: String,
    Date_of_Birth: Date,
    Work_Experience: String,
    Resume_Title: String,
    Current_Location: String,
    Postal_Address: String,
    Current_Employer: String,
    Current_Designation: String
});

var excelModel = mongoose.model('exceldata', excelSchema);

module.exports = excelModel;
const mongoose = require('mongoose');
const employeeInfo = new mongoose.Schema({
    first_name: { type: String,maxLength: 100, required: true },
    last_name: { type: String, maxLength: 50, required: true },
    email: { type: String, maxLength: 50, unique:true, required: true, lowercase:true},
})
const Employee = mongoose.model('employee', employeeInfo)
module.exports = {Employee};
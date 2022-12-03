const express = require('express')
const mongoose = require('mongoose')

const { Employee } =require('./model.js')

const app = express()
const port = 3000
const DB_URL = 'mongodb+srv://mehrad72:yZCk4KpLViZgXQP5@data-base.6fusqhj.mongodb.net/?retryWrites=true&w=majority';
app.use(express.json());


app.get("/employees", async (req, res) => {
    const employees = await Employee.find();
    return res.status(200).json(employees);
  });

app.post("/employees", async (req, res) => {
try{
    const addEmployee = new Employee({ ...req.body });
    const added = await addEmployee.save();
    return res.status(201).json(added);
}
catch (err) {
    return res.status(500).json({ message: 'could not add employee'});
  }
});

app.get("/employees/:id", async (req, res) => {
    const { id } = req.params;
    const employee = await Employee.findById(id);
    try{
        return res.status(200).json(employee, { message: 'employee found'});

    }
    catch (err) {
        return res.status(500).json({ message: 'could not find employee'});
      }
});
app.delete("/employees/:id", async (req, res) => {
    const { id } = req.params;
    const employee = await Employee.findByIdAndDelete(id);
    try{
        return res.status(200).json(employee, { message: 'employee deleted'});

    }
    catch (err) {
        return res.status(500).json({ message: 'could not delete employee'});
      }
});

const start = async () => {
    try {
      await mongoose.connect(
        DB_URL
      );
        console.log("Successfully connected to the database mongoDB Atlas Server");
      app.listen(port, () => console.log(`listening at http://localhost:${port}`));
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };
  
  start();
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
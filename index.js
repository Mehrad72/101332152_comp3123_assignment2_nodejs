const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const { Employee } =require('./model.js')

const app = express()
const port = 3000
const DB_URL = 'mongodb+srv://mehrad72:yZCk4KpLViZgXQP5@data-base.6fusqhj.mongodb.net/?retryWrites=true&w=majority';
app.use(express.json(), cors());

app.get("/employees", async (req, res) => {
    const employees = await Employee.find();
    console.log(employees);
    return res.status(200).json(employees);
  });

app.post("/employees", async (req, res) => {
try{
    const addEmployee = new Employee({ ...req.body });
    const add = await addEmployee.save();
    console.log(add)
    return res.status(201).json(add);
}
catch (err) {
    return res.status(500).json(err);
  }
});

app.put("/employees/:id", async (req, res) => {
  try
  {
      await Employee.findByIdAndUpdate(req.params.id, req.body).then((employee) => {
          if(employee)
          {
              res.status(200).send({employee,  message: "employee updated successfully."});
          }
          else
          {
              res.status(500).send({
                  message: "couldnt find the employee."
              });
          }
      })
  }
    catch (err) {
        return res.status(500).json({ message: 'could not find employee'});
      }
});

app.delete("/employees/:id", async (req, res) => {
    try{
      const empId = await Employee.findByIdAndDelete(req.params.id);
      if(empId)
      {
          res.status(204).send({empId,  message: "employee deleted successfully."});
      }
      else
      {
          res.status(500).send({
              message: "couldnt find the employee."
          });
      }

    }
    catch (err) {
        return res.status(500).json(err);
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
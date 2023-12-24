const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const connection = require('./db')

app.use(cors());    
app.use(bodyParser.json())
app.get('/tasks', (request,response) => {
    const query = `SELECT * FROM taskmanager.tasks`;
    connection.query(query, (err,data) => {
        if (err) console.log(err)
        else response.send(data) /* THIS RESPONSE.SEND(DATA) IS IMPORTANT, ITS HOW THE GET REQUEST IN THE TASKLIST GETS ITS INFORMATION UTILIZING 
        THE RESPONSE IN THE INITIAL REQUEST TO SEND BACK TO SENDER AND THE DATA FROM THE SQL QUERY AS A PACKAGE OF INFO INSIDE.*/
    })
})
app.post('/addTask', (req,res) => { /* ` allows for (${}) to work and allow you to insert variables into the string, 
taskmanager.tasks is just referencing the database name and table, request is the info u receive and manipulate*/
    const query = `INSERT INTO taskmanager.tasks (task) VALUES ('${req.body.task}')`
    /*use body here because the information is contained in the body of the request and we extract task out*/
    connection.query(query, (err,data) => {
        if (err) console.log(err)
        else res.send("Task Added")
    })
})
app.delete('/deleteTask/:taskid', (req,res) => {
    const query = `delete from taskmanager.tasks where (task_id = ${req.params.taskid})`; 
    /*req.params.data is an easy way to extract data embedded in the request*/
    connection.query(query, (err,data) =>{
        if(err) console.log(err)
        else res.send("Task Deleted")
    })
})
app.listen(4000, () => {
    console.log("running on port 4000")
})

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const todoModel = require('./Models/todo')

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/student')

app.get('/get',(req,res)=>{
    todoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.put('/update', (req,res)=>{
    let {id, done} = req.body.params;
    done = done === true ? false: true;
    todoModel.findByIdAndUpdate({_id: id}, {done: done})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.put('/edit', (req,res)=>{
    let {id, task} = req.body.params;
    // console.log(id, task);
    todoModel.findByIdAndUpdate({_id: id}, {task: task})
    .then(result => res.json(result))
    .catch(err => res.json(err));
})

app.post('/add',(req,res,next)=>{
    const task = req.body.task;
    todoModel.create({
        task: task,
    }).then(result => res.json(result))
    .catch(err => res.json(err));
})

app.delete('/delete/:id',(req,res)=>{
    const {id} = req.params;
    todoModel.findByIdAndDelete({_id: id})
    .then(result => res.json(result))
    .catch(err => res.json(err));
})

app.listen(3001, () =>{
    console.log('running');
})
const mongoose = require('mongoose')
const {taskModel} = require('../Models/TaskModel')


//To create task - POST

const createTask = async (req,res)=>{
    const {PhoneNumber,Items,OrderId,Status} = req.body

    try{
        const task = await taskModel.create({PhoneNumber,Items,OrderId,Status})
        res.status(200).json(task)
    }catch(e){
            res.status(400).json({error:e.message})
    }
}

// Fetch all data - GET

const getTasks = async (req,res) =>{
    try{
        const tasks = await taskModel.find({})
        res.status(200).json(tasks)
    }catch(e){
        console.log('Error',e)
        res.status(400).json({error:e.message})
    }
}
// Fetch particular data - GET

const getSingleTasks = async (req,res) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({Error:`Document not Found for ${id}`})
    }
    try{
        const singleTasks = await taskModel.findById(id)
        res.status(200).json(singleTasks)
    }catch(e){
        console.log('Error',e)
        res.status(400).json({error:e.message})
    }
}
// To update doc - PATCH
const updateTasks = async(req,res) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({Error:`Document not Found for ${id}`})
    }
    try{
        const tasks = await taskModel.findByIdAndUpdate({
            _id:id
        },
        {
            ...req.body // Keep all data too and Update the req.body value 
        })
            res.status(200).json(tasks)
    }catch(e){
        res.status(400).json({error:e.message})
    }
    // `No document found on _id : ${id}`
}

//To delete a document - DELETE 
const deleteTask = async(req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({Error:`Document not Found for ${id}`})
    }
    try{
        const task = await taskModel.findByIdAndDelete(id)
        res.status(200).json(task)
    }catch(e){
        res.status(400).json({error:e.message})
    }
}
module.exports = {createTask,getTasks,getSingleTasks,updateTasks,deleteTask };


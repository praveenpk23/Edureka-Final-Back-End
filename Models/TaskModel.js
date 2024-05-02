const mongoose = require('mongoose');
const { type } = require('os');

const Schema = mongoose.Schema;


const TaskSchema = new Schema({
     PhoneNumber:{
        type:Number,
        require:true,
     },
     Items:{
        type:Array,
        require:true,
     },
     OrderId:{
      type:String,
      require:true,
     },
     Status:{
      type:String,
      require:true,
     }   
},
{timestamps:true}
);

module.exports.taskModel = mongoose.model("Task",TaskSchema,"Orders")
// import { createRequire } from "module";
// const require = createRequire(import.meta.url);

const mongoose = require('mongoose');
const Schema =  mongoose.Schema;
const account =  new Schema({
    id:{type:Number,required:true},
    name:{type:String,required:true, maxLength:20}, 
    password:{type :String,required:true, maxLength:255},
    role:{type:String, enum: ['admin', 'user']}
})

module.exports = mongoose.model('account',account);
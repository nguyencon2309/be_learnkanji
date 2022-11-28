// import { createRequire } from "module";
// const require = createRequire(import.meta.url);


const mongoose = require('mongoose');
const Schema =  mongoose.Schema;
const level =  new Schema({
    id:Number,
    namelevel:String
})

module.exports = mongoose.model('levels',level);
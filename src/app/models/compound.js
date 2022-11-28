// import { createRequire } from "module";
// const require = createRequire(import.meta.url);


const mongoose = require('mongoose');
const Schema =  mongoose.Schema;
const compound =  new Schema({
    stt:String,
    compound:String,
    hiragana:String,
    mean:String,
    vocabulary:String
})

module.exports = mongoose.model('compounds',compound);





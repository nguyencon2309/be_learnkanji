// import { createRequire } from "module";
// const require = createRequire(import.meta.url);



const mongoose = require('mongoose');
const Schema =  mongoose.Schema;
const lesson =  new Schema({
    level:String
})

module.exports = mongoose.model('lessons',lesson);
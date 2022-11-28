// import { createRequire } from "module";
// const require = createRequire(import.meta.url);

const mongoose = require('mongoose');

async function connect(){
    try{
        await mongoose.connect('mongodb+srv://admin:12345qwert@dbkanji.2gajuyt.mongodb.net/dbkanji');
        console.log("thanh cong")
    }
    catch(error){
        console.log("connect fail");
    }
     
}

module.exports = { connect };
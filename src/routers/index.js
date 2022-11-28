// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
// const tf = require("@tensorflow/tfjs");
// const tfn = require("@tensorflow/tfjs-node");
// const handler = tfn.io.fileSystem('src/app/controllers/model/model.json');
// let model;
let model = async()=>{}
// let modell = async() => {
    
//     try {
//       model = await tf.loadLayersModel(handler);
//       // console.log("load model")
//       // console.log(model.summary());
//     } catch (err) {
//       console.log(err);
//     }
//     return model;
//   };

const newRouter = require('./news')
const siteRouter = require('./site')

const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');

function route(app){
    
   
    // modell();
    
    app.use(session({
        secret: 'work hard',
        resave: true,
        saveUninitialized: false,
    }));

    
    
    app.use('/api/v1',siteRouter);
    //app.use('/api/v1/',)
   
    
}    
module.exports = {model,route};
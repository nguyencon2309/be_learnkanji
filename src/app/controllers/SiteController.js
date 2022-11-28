
const Account = require('../models/account');
const Lesson = require('../models/lesson');
const Kanji = require('../models/kanjitext');
const {mutipleMongooseToObject}=require('../../util/mongoose')

// // const tf = require("@tensorflow/tfjs");
// const KANJI_CLASSES = require('./kanjiclass.js')
// let {model} = require('../../routers/index')
// const TOP_K = 5




// const {createCanvas,loadImage} = require('canvas');
// function convertImageToCanvas(image) {
//     var canvas = document.createElement("canvas");
//     canvas.width = 150;
//     canvas.height = 150;
//     canvas.getContext("2d").drawImage(image, 0, 0);
//     return canvas;
// }
// function getTopK(predictions, k){
//     top_k = Array.from(predictions)
//         .map(function(p, i){
//             return {
//                 probability: p,
//                 className: KANJI_CLASSES[i]
//             };
//         }).sort(function(a,b){
//             return b.probability - a.probability;
//         }).slice(0, TOP_K);

//     return top_k
// }
class SiteController{
    
     async detect(req,res,next){
        console.log(req.file);
    //     console.log(KANJI_CLASSES[0]);
        
    //     console.log(model.summary());

        
    //     const img= await loadImage("C:/Users/Administrator/Downloads/ETL9B/3c23/ETL9B_8_3c23_2.png")
    //         const img=image;
    //     const canvas = createCanvas(150,150);
    //     const ctx = canvas.getContext("2d")
    //     ctx.drawImage(img,0,0)
    //     console.log(ctx)
       
    //     let tensor = tf.browser.fromPixels(canvas)
	//     .resizeNearestNeighbor([96, 96])
	//     .expandDims()
	//     .toFloat();
    //     tensor = tensor.div(255.);
    //    // {#2#}
    //     let predictions = await model.predict(tensor).dataSync();
    //     // console.log(predictions);
    //     let top_k = getTopK(predictions, TOP_K);
    //     console.log(top_k);

    //     res.json({top_k});




   
    }
    listaccount(req,res,next){
        
        let a=req.query.name;
        let b=req.query.role;
        Account.find({

        }, function(err,account){
            if(!err){
                res.json({account});
            } else{
                res.status(400).json({error:'ERROR'});
                return;
            }
            // res.render('home');
        })
       

    }
    // search(req,res){
    //     res.render('search');
    // }
    search(req,res,next){//tim kiem chu kanji bang hinh anh
        
    }
    listlesson(req,res,next){
        
        
        Lesson.find({}, function(err,lesson){
            if(!err){
                res.json({lesson});
            } else{
                res.status(400).json({error:'ERROR'});
                return;
            }
            
        })
    }
    lesson(req,res,next){
        
        
        Kanji.find({idlesson:req.query.id}, function(err,kanjitext){
            if(!err){
                res.json({kanjitext});
            } else{
                res.status(400).json({error:'ERROR'});
                return;
            }
            
        })
    }

}

module.exports = new SiteController;
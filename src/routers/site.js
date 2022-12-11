

const express=require("express")
const router=express.Router();

const siteController = require('../app/controllers/SiteController');
const accountController = require('../app/controllers/AccountController');
const kanjiController= require('../app/controllers/KanjiController');
const compoundController = require('../app/controllers/CompoundController');
router.get('/detail/:id',kanjiController.detail_id)
router.get('/upppp',compoundController.uppd)

router.get('/listlesson',siteController.listlesson)
router.get('/lesson/:level',kanjiController.lesson)
router.post('/login',accountController.login)
router.post('/logout',accountController.logout)
router.post('/signin',accountController.signin)
// router.get('/detail',kanjiController.detail)

//router.get('/showtughep',kanjiControlle.show)
router.get('/search',kanjiController.search)

router.get('/listkanji',kanjiController.listkanji)
//just admin
router.get('/listaccount',siteController.listaccount)
const lessonController = require("../app/controllers/LessonControllers")
router.get('/listlesson',lessonController.listlesson)

//compound//
router.post('/compound/create',accountController.requiresLogin,accountController.isAdmin,compoundController.create)
router.post('/compound/update',accountController.requiresLogin,accountController.isAdmin,compoundController.update)
router.post('/compound/delete',accountController.requiresLogin,accountController.isAdmin,compoundController.delete)
const multer= require("multer")
const path=require("path")
//storage detect 
const storage = multer.diskStorage({
    destination: './src/routers/image',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}${path.extname(file.originalname)}`)
    }
})
//so sánh
const storage1 = multer.diskStorage({
    destination: './src/routers/image',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}${path.extname(file.originalname)}`)
    }
})
const upload = multer({
    storage: storage,
    storage:storage1,
    
})

const tf = require("@tensorflow/tfjs");
const tfn = require("@tensorflow/tfjs-node");
const handler = tfn.io.fileSystem('src/app/controllers/model/model.json');
// C:

const KANJI_CLASSES = require('./kanjiclass.js')
const TOP_K = 5;
let model;
async function LoadModel() {
     model = await tf.loadLayersModel(handler);
}
LoadModel()
const {createCanvas,loadImage} = require('canvas');
function convertImageToCanvas(image) {
    var canvas = document.createElement("canvas");
    canvas.width = 150;
    canvas.height = 150;
    canvas.getContext("2d").drawImage(image, 0, 0);
    return canvas;
}
function getTopK(predictions, k){
    top_k = Array.from(predictions)
        .map(function(p, i){
            return {
                probability: p,
                className: KANJI_CLASSES[i]
            };
        }).sort(function(a,b){
            return b.probability - a.probability;
        }).slice(0, TOP_K);

    return top_k
}
//model function
// async model()=>{
//     return  await tf.loadLayersModel(handler);
// }

router.post('/detect',upload.single('file'), async(req,res)=>{
    // console.log(req.file)
    //res.json("upload successfully")
    // let model = await tf.loadLayersModel(handler);
        
        //console.log(model.summary());
        const img= await loadImage("src/routers/image/file.png")
           
        const canvas = createCanvas(150,150);
        const ctx = canvas.getContext("2d")
        ctx.drawImage(img,0,0)
        // console.log(ctx)
       
        let tensor = tf.browser.fromPixels(canvas)
	    .resizeNearestNeighbor([96, 96])
	    .expandDims()
	    .toFloat();
        tensor = tensor.div(255.);
       // {#2#}
        let predictions = await model.predict(tensor).dataSync();
        // console.log(predictions);
        let top_k = getTopK(predictions, TOP_K);
        // console.log(top_k);

        res.json({top_k});

    
})
//danh gia   㰡

router.post('/evaluate',upload.single('eval'), async(req,res)=>{
    let a=req.body.kanji//get kanji
    let st=-1
    let s=" Sorry Kanji "+a+" not found !!!"
    let d=0
    //kiểm tra kanji có tồn tại trong kanji_class ko
    for(let i=0;i<3036;i++){
        d+=1
        if (a==KANJI_CLASSES[i]){
         st=i;
         //nếu có thoát tiếp
         s=a
         break
        }

    }
   
    
        const img= await loadImage("src/routers/image/eval.png")
           
        const canvas = createCanvas(150,150);
        const ctx = canvas.getContext("2d")
        ctx.drawImage(img,0,0)
        

        let tensor = tf.browser.fromPixels(canvas)
	    .resizeNearestNeighbor([96, 96])
	    .expandDims()
	    .toFloat();
        tensor = tensor.div(255.);
       
        let predictions = await model.predict(tensor).dataSync();
        let top_k = getTopK(predictions, TOP_K);
        let cr=st==-1?"kanji ko tim thay":predictions[st]
        let tt=0
        res.json({"kanji":a,"correct_ratio":cr,"top_k":top_k})
        
       
        

    
})

module.exports=router;
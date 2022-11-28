
const Account = require('../models/account');
const Lesson = require('../models/lesson');
const Kanji = require('../models/kanjitext');
const {mutipleMongooseToObject}=require('../../util/mongoose')


class SiteController{
    
     async detect(req,res,next){
        console.log(req.file);
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
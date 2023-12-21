

const Kanjitext = require('../models/kanjitext');
const Compound = require('../models/compound')
const {mutipleMongooseToObject}=require('../../util/mongoose');


const listk=()=>{
    let a;
     Kanjitext.find({
        
    },function(err,a){
        if (!err){
            console.log(a)
           
           
        }
        else{
           
        }
    }).limit(6)
    return a;
}

let myobj=[];
function listkanji(){
    //console.log("test")
   
    Kanjitext.find({
        
    },function(err,kanjitext){
        if (!err){
           for(let i in kanjitext){
            myobj.push(kanjitext[i].kanji)
            
           }
           
        }
        else{
           
        }
    })
    
}
listkanji()
class KanjiController{
    
    lesson(req,res,next){
        let a=req.params.level
        
        Kanjitext.find({
           level:a 
        },{ _id:0,kanji:1,vocabulary:1,mean:1,id:1},function(err,kanjitext){
            if (!err){
                   
                res.json(kanjitext)
            }
            else{
                return ;
            }
        })

    }
    
    detail_id(req,res,next){
        let a=req.params.id
        if (a===undefined||a>1946 ||a<1){
            res.status(400).json({error:'ERROR'});
            return ;
        }
        
        Kanjitext.findOne({
            id :a
         },function(err,kanjitext){
             if (!err){
                
                let kanji = kanjitext.kanji
                let vocabulary=kanjitext.vocabulary
                let onyomi=kanjitext.onyomi
                let kunyomi=kanjitext.kunyomi
                let mean=kanjitext.mean
                let level=kanjitext.level
                let id=kanjitext.id
                Compound.find({
                    compound: {$regex: kanji, $options: 'i'}
        
                },{_id:0,stt:0}, function(err,compound){
                    if(!err){
                        res.json({kanji,vocabulary,onyomi,kunyomi,mean,level,id,"compounds":compound});
                    } 
                }
        
                ).limit(7);
             }
             else{
                 res.status(400).json({error:'ERROR'});
                 return ;
             }
         })

    }
    

    
    search(req,res,next){
        // console.log(listk())
        let a=req.query.name;
        if (a=="") a="abcdefghijklmnou";
        
        
        let t=0
        for(let i in myobj){
            if (a==myobj[i]){
                t=1;
                break;
            }
        }
        if(t==0){     
        Compound.find({
            $or:[
            {vocabulary:{$regex: a, $options: 'i'}},
            {hiragana:{$regex: a, $options: 'i'}},
            {compound:{$regex: a, $options: 'i'}},
            {mean:{$regex: a, $options: 'i'}}
        ]
    
        },{_id:0,stt:0}, function(err1,compound){
            if(!err1){
                let b=a
                if ( typeof compound[0] !== 'undefined' && compound[0] ){
                    b=compound[0].compound[0]
                }
                Kanjitext.find({
                   $or:[{vocabulary:{$regex:a,$options:'i'}},
                   {mean:{$regex: a, $options: 'i'}},
                   {kanji:{$regex: a, $options: 'i'}},
                   {kanji:{$regex: b, $options: 'i'}}
                ]

                
                },{_id:0}, function(err,kanjitext){
                    if(!err){
                        if ( typeof kanjitext[0] !== 'undefined' && kanjitext[0] )
                        {
                        var bbb= kanjitext[0]    

                        let kanji = bbb.kanji
                        let vocabulary=bbb.vocabulary
                        let onyomi=bbb.onyomi
                        let kunyomi=bbb.kunyomi
                        let mean=bbb.mean
                        let level=bbb.level
                        let id=bbb.id
                        res.json({kanji,vocabulary,onyomi,kunyomi,mean,level,id,"compounds":compound})
                    }
                    else{
                    res.json({"compounds":compound})}

                    } else{
                        res.status(400).json({error:'ERROR'});
                        return;
                    }
                    // res.render('home');
                })

            } else{
                res.status(400).json({error:'ERROR'});
                return;
            }
        }).limit(7);
    }
    else{
        Kanjitext.findOne({
            kanji :a
         },function(err,kanjitext){
             if (!err){
                
                let kanji = kanjitext.kanji
                let vocabulary=kanjitext.vocabulary
                let onyomi=kanjitext.onyomi
                let kunyomi=kanjitext.kunyomi
                let mean=kanjitext.mean
                let level=kanjitext.level
                let id=kanjitext.id
                Compound.find({
                    compound: {$regex: kanji, $options: 'i'}
        
                },{_id:0,stt:0}, function(err,compound){
                    if(!err){
                        res.json({kanji,vocabulary,onyomi,kunyomi,mean,level,id,"compounds":compound});
                    } 
                }
        
                ).limit(7);
             }
             else{
                 res.status(400).json({error:'ERROR'});
                 return ;
             }
         })

    }
    
        
        
    }

    searchimg(req,res,next){

        Kanji.find({
            kanjitext:req.body.text

            //tim kiem theo hinh anh or tu khoá

        }, function(err,kanji){
            if(!err){
                res.json({kanji});
            } else{
                res.status(400).json({error:'ERROR'});
                return;
            }
            // res.render('home');
        })

    }
}
module.exports = new KanjiController;
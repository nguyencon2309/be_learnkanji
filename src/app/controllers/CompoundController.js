// import { createRequire } from "module";
// const require = createRequire(import.meta.url);


const Compound = require('../models/compound')
const {mutipleMongooseToObject}=require('../../util/mongoose');
const compound = require('../models/compound');
class CompoundController{
    delete(req,res,next){
        Compound.remove({
            compound:req.body.text
        },function(err,compound){
            if (!err){
                res.json("Delete successfully!")
            }
            else{
                res.status(400).json({error:'ERROR'});
                return;
            }
        })
    }

    create(req,res,next){
        Compound.findOne({compound:req.body.compound},(err,compound) =>{
            if(compound==null){
                const compound = new Compound(req.body)
                compound.compound=req.body.compound,
                compound.hiragana=req.body.hiragana,
                compound.vocabulary=req.body.vocabulary,
                compound.mean=req.body.mean,
                compound.save((err,result)=>{
                    if(err){
                         res.json({err})
                         return;
                    }
                    res.json({compound:result})
                })
            }
            else{
                res.json({err:'this compound has been used'})
            }
        })
    }
    
    update(req,res,next){
        const query = { compound: req.body.compoundold};
        const update = { $set: { compound:req.body.compoundnew,mean: req.body.mean, hiragana:req.body.hiragana,vocabulary:req.body.vocabulary}};
        const options={upset:true};
        Compound.updateOne({query, update, options
        },function(err,compound){
            if (!err){
                res.json("Update successfully!")
            }
            else{
                res.status(400).json({error:'ERROR'});
                return;
            }
        })
    }
    uppd(req,res,next){
        Compound.updateMany({
            $rename:{"hiragan":"hiragana"}
        },function(err,compound){
            if (!err){
                res.json("Update successfully!")
            }
            else{
                res.status(400).json({error:'ERROR'});
                return;
            }
        })
    }

    

    
}
module.exports = new CompoundController;
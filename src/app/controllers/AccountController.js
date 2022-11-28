// import { createRequire } from "module";
// const require = createRequire(import.meta.url);

const Account = require('../models/account');
const {mutipleMongooseToObject}=require('../../util/mongoose')
const express=require("express")


class AccountController{
    //tao tai khoan
    
    isAdmin(req,res,next){
        if(req.session.role=="admin"){
            return next();
        }
        else{
            return res.json({err:"you have not permission"})
        }
    }
    requiresLogin(req, res, next) {
        if (req.session && req.session.user) {
            return next();
        } else {
            return res.json({err: 'You must be logged in to view this page.'});
        }
    }
    signin(req,res,next){
        
        Account.findOne({name:req.body.name},(err,account) =>{
            if(account==null){
                const account = new Account(req.body)
                account.role="user"
                account.id=10
                account.save((err,result)=>{
                    if(err){
                       res.json({err})
                       return;
                    }
                    res.json({account:result})
                })
            }
            else{
                res.json({err:'name has been used'})
            }
        })
        
         
    }
    login(req,res,next){
        Account.findOne({name:req.body.name,password:req.body.password},(err,account)=>{
            if(err) {
                 res.json({err})
                 return;
            }
            else if (!account){
                return res.json({err:'user or password are incorrect!!!'+req.body.name+req.body.password})
            }
                req.session.role = account.role; 
                req.session.user =account;
                res.json({
                    account: account,
                    
                    "login": "success"
                })//Dang nhap thanh cong, gan session
        })
    }


    //logout tai khoan
    logout(req,res,next){
        if (req.session) {
            // delete session object
            req.session.destroy(function(err) {
                if(err) {
                    res.json({err});
                    return;
                } else {
                    return res.json({'logout': "Success"});
                }
            });
        }
        else{
            res.json("You ever login")
        }
    }
    //update tai khoan
}
module.exports = new AccountController;
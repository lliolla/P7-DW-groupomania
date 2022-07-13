// import models in table POSTS
const Model = require('../models');
const jwt = require("jsonwebtoken");

exports.getAllCmts = (req,res,next)=>{
console.log('getAllCmts',getAllCmts);
}

exports.getOneCmts = (req,res,next)=>{
    console.log('getOneCmtsByUser',getOneCmts);
    }

exports.updateCmts = (req,res,next)=>{
    console.log('updateCmts',updateCmts);
    }
exports.createCmts =(req, res,next)=>{
    console.log('updateCmts',updateCmts);
}
exports.delateCmts = (req,res,next)=>{
    console.log('delateCmts',delateCmts);
    }
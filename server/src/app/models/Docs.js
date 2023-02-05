//ESSE ARQUIVO IRA AUXILIAR O CONTROLE 

const mongoose = require('mongoose');

//=========================================
const moldeGenerico= new mongoose.Schema({
    user:{type: String, required: true, minlength:3, maxlength:30},
    title:{type: String, required: true, minlength:3, maxlength:30},
    description: {type: String, required: true, maxlength:100},
    url:{type: String, required: true, maxlength:100},
    click:{type:Number, minlength:0 }
})
//=========================================

 
module.exports= mongoose.model('Docs', moldeGenerico);

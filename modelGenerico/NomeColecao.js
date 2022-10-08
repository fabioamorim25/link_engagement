//ESSE ARQUIVO IRA AUXILIAR O CONTROLE 

const mongoose = require('mongoose');

//=========================================
const moldeGenerico= new mongoose.Schema({
    title:{type: String, required: true, minlength:3, maxlength:30},
    description: {type: String, required: true, maxlength:100},
    url:{type: String, required: true, maxlength:100},
    click:{type:Number}
})
//=========================================

 
module.exports= mongoose.model('NomeColecao', moldeGenerico);

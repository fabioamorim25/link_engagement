//ESSE ARQUIVO IRA AUXILIAR O CONTROLE 

const mongoose = require('mongoose');

//=========================================
const moldeGenerico= new mongoose.Schema({
   
    title: String,
    description: String,
    url:String,
    click: Number //1° PARTE: criar a caracteristica click para armazenar a quantidade de clicks um dado teve
})
//=========================================

 
module.exports= mongoose.model('NomeColecao', moldeGenerico);

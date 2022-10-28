//ESSE ARQUIVO IRA AUXILIAR O CONTROLE 
const mongoose = require('mongoose');

const moldeGenericoUser= new mongoose.Schema({
    name:{type: String, minlength:3, maxlength:20}
})


 
module.exports= mongoose.model('DocumentUser', moldeGenericoUser);
//ESSE ARQUIVO IRA AUXILIAR O CONTROLE 
const mongoose = require('mongoose');

const moldeGenericoUser= new mongoose.Schema({
    name:{type: String, minlength:3, maxlength:20}
})


 
module.exports= mongoose.model('DocumentUser', moldeGenericoUser);//3°parte pegar o modelo do documento do usuario. sera usada para auxiliar no processo de mostra todos os usuarios na tela
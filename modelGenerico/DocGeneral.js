//ESSE ARQUIVO VAI RECEBER ALGUMAS INFORMAÇÕES QUE FORAM ADQUIRIDAS PELOS ARQUIVOS [DocumentUser e NomeColecao]. onde depois sera usado para os dados da pagina principal 
const mongoose = require('mongoose');

const moldeGenericGeneral= new mongoose.Schema({
    dado:{type: String, maxlength:15},
    url:{type: String, maxlength:100},
    clicks:{type:Number}
})


 
module.exports= mongoose.model('DocGeneral', moldeGenericGeneral);
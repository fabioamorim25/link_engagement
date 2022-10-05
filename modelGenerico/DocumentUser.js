// ARQUIVO CONTEM O MODELO DO DADO A SER RECEBIDO OU TRABALHADO NO SISTEMA (USUARIO)

const mongoose = require('mongoose');

//=========================================
const moldeGenericoUser= new mongoose.Schema({
    name:{type: String, minlength:3, maxlength:30}
})
//=========================================

 
module.exports= mongoose.model('DocumentUser', moldeGenericoUser);
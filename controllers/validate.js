const joi = require('@hapi/joi');


//FUNCIONALIDADE PARA VERIFICAR OS DADOS DIGITADOS PARA A CRIAÇÃO DO DOCUMENTO 
const validateDados = (data) => {
    const schema = joi.object({
        //Caracterisiticas dos dados
        title: joi.string().required().min(3).max(20),
        description: joi.string().required().max(200),
        url: joi.string().required()
    });

    //validar os dados recebidos
    return schema.validate(data);
}
//FUNCIONALIDADE PARA VERIFICAR OS DADOS DIGITADOS PARA A CRIAÇÃO DO DOCUMENTO 
const validateDadoUser = (data) => {
    const schema = joi.object({
        //Caracterisiticas dos dados
        user: joi.string().required().min(3).max(20),
        title: joi.string().required().min(3).max(20),
        description: joi.string().required().max(200),
        url: joi.string().required()
    });

    //validar os dados recebidos
    return schema.validate(data);
}
const validateUser = (data) => {
    const schema = joi.object({
        //Caracterisiticas dos dados
        name: joi.string().required().min(3).max(15)
    });

    //validar os dados recebidos
    return schema.validate(data);
}



module.exports = {validateDadoUser,validateDados,validateUser};
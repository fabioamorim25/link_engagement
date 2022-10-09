const joi = require('@hapi/joi');

const validateDados = (data) => {
    const schema = joi.object({
        //Caracterisiticas dos dados
        title: joi.string().required().min(3).max(20),
        description: joi.string().required().max(200),
        url: joi.string().required()
    });
    return schema.validate(data);//validar os dados recebidos
}
const validateUser = (data) => {
    const schema = joi.object({
        //Caracterisiticas dos dados
        name: joi.string().required().min(3).max(15)
    });
    return schema.validate(data);//validar os dados recebidos
}



module.exports = {validateDados,validateUser};
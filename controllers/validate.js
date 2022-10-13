const joi = require('@hapi/joi');

//criar um documento generico com as caracterisicas que sera verificada se esta de acordo com as caracteristicas definidas

const validateDados = (data) => {
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


//exportar as funçõe de validação
module.exports = {validateDados,validateUser};
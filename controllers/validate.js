const joi = require('@hapi/joi');

//1°parte: criar um documento generico com as caracterisicas que sera verificada se esta de acordo com as caracteristicas definidas
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



//exportar a função de validação
module.exports.validateDados = validateDados;
const DocumentUser = require ('../modelGenerico/DocumentUser');
const {validateUser}= require ('./validate');//chamar a função de validação do nome do usuario

//FUNCIONALIDADE PARA ADICIONAR DADOS 
const addUser = async (req, res) => {
    //validar os dado do input nome do novo usuario--
    const { error } = validateUser(req.body);
    if (error) {
        return res.status(400).send(error.message);// [DEVE SER MELHORAR A ENTREGA DA MENSAGEM NO FRONT NAS PROXIMA ATUALIZAÇÃO]
    }
    //----------------------------------------------
   
    //validar se o nome do usuario já existe---------
    const selectedUser = await DocumentUser.findOne({name: req.body.name});
    if (selectedUser){
        return res.status(400).send("o usuario já existe") // [DEVE SER MELHORAR A ENTREGA DA MENSAGEM NO FRONT NAS PROXIMA ATUALIZAÇÃO]
    }
    //-----------------------------------------------

    let documentUser =new DocumentUser (req.body)
    try {
        let doc =await documentUser.save();
        res.redirect ('/');
    } catch (error) {
        res.render({ error, body: req.body }); 
    }
}






module.exports= {addUser};//exportar a funcionalidade 
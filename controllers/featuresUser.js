// ARQUIVO CONTEM TODAS AS FUNCIONALIDADES RELACIONADO AO CONTROLE DE USUARIOS
const DocumentUser = require ('../modelGenerico/DocumentUser');


//FUNCIONALIDADE PARA ADICIONAR DADOS 
const addUser = async (req, res) => {
    let documentUser =new DocumentUser (req.body)
    try {
        let doc =await documentUser.save();
        res.redirect ('/');
        
    } catch (error) {
        res.send("error ao adicionar o usuario"); 
    }
}

module.exports= {addUser};//exportar a funcionalidade 
const NomeColecao=require('../modelGenerico/NomeColecao') 
const {validateDados}= require ('./validate');
const DocumentUser = require ('../modelGenerico/DocumentUser'); //[OBS:SISTEMA DO USUARIO]

//FUNCIONALIDADE PARA VER TODOS OS DADOS
const todoDado= async (req,res)=>{
    try { 
        let dados = await NomeColecao.find({});//pegar os documentos registrdos
        let users = await DocumentUser.find({});//ver os dados do usuario [OBS:SISTEMA DO USUARIO]
        
        res.render('all.ejs', {dados,users});//passar a lista de usuarios para a pagina all.ejs[OBS:SISTEMA DO USUARIO]
    } catch (error) {
        res.status(404).send(error);
    }
}
//FUNCIONALIDADE PARA REDIRECIONAR PARA O DADO
const redirect = async (req, res) => {
    let title = req.params.title;
    try {
        let doc = await NomeColecao.findOneAndUpdate({ title }, { $inc:{ click:1 } });
        res.redirect(doc.url)
    } catch (error) {
        res.status(404).send(error); 
    }
}
//======================================================================
//função que sera responsavel por recarregar a pagina [edit.ejs]
const loadDados = async (req, res) => {
    let id = req.params.id;
    try {
        let doc = await NomeColecao.findById(id);
        res.render('./edit.ejs', {error: false ,body: doc})
    } catch (error) {
        res.status(404).send(error); 
    }
}
//FUNCIONALIDADE PARA ADICIONAR DADOS 
const addDado = async (req, res) => {
    //chamar a validação dos dados-----------------
    const { error } = validateDados(req.body);
    if (error) {
        return res.status(400).send(error.message);
    }//--------------------------------------------

    let nomeColecao =new NomeColecao (req.body)
    try {
        let doc =await nomeColecao.save()
        res.redirect ('/');
        
    } catch (error) {
        res.render('add.ejs', { error, body: req.body }); 
    }
}

module.exports={todoDado, redirect, loadDados, addDado};//exportar a funcionalidade 
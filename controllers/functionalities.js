const NomeColecao= require('../modelGenerico/NomeColecao') 
const {validateDadoUser}= require ('./validate');
const DocumentUser = require ('../modelGenerico/DocumentUser'); //[OBS:SISTEMA DO USUARIO]

//FUNCIONALIDADE PARA VER TODOS OS DOCUMENTOS 
const todoDado= async (req,res)=>{
    try { 
        let dados = await NomeColecao.find({});//pegar os documentos registrdos
        let users = await DocumentUser.find({});//ver os dados do usuario [OBS:SISTEMA DO USUARIO]
        
        res.render('all.ejs', {dados,users});//passar a lista de usuarios para a pagina all.ejs[OBS:SISTEMA DO USUARIO]
    } catch (error) {
        let message = error;
        let status = 404;
        res.status(404).render('error.ejs', {message,status}); //redirecionar para a pagina de error
    }
}
//FUNCIONALIDADE PARA REDIRECIONAR PARA O DOCUMENTO 
const redirect = async (req, res) => {
    let title = req.params.title;
    try {
        let doc = await NomeColecao.findOneAndUpdate({ title }, { $inc:{ click:1 } });
        res.redirect(doc.url)
    } catch (error) {
        let message = error;
        let status = 404;
        res.status(404).render('error.ejs', {message,status}); //redirecionar para a pagina de error
    }
}
//função responsavel por recarregar a pagina [edit.ejs]
const loadDados = async (req, res) => {
    let id = req.params.id;
    try {
        let doc = await NomeColecao.findById(id);
        res.render('./edit.ejs', {error: false ,body: doc})
    } catch (error) {
        let message = error;
        let status = 404;
        res.status(404).render('error.ejs',{message,status}); //redirecionar para a pagina de error 
    }
}
//FUNCIONALIDADE PARA ADICIONAR DOCUMENTOS 
const addDado = async (req, res) => {
    //chamar a validação dos dados-----------------
    const { error } = validateDadoUser(req.body);
    if (error) {
        return res.status(400).render('add.ejs',{error});
    }//--------------------------------------------
    //validar se o documento já existe---------
    const selectedDoc = await NomeColecao.findOne({title: req.body.title});
    if (selectedDoc){
        let message = "O titulo do documento já existe";
        return res.status(400).render('error.ejs',{message,status});//redirecionar para a pagina de error
    }
    //-----------------------------------------------
    //validar se o usuario do documento existe---------
    const validateUser = await DocumentUser.findOne({name: req.body.user});//pegar o nome do user recebido do front e colocar seu valor na chave name que corresponde a caracteristica do DocumentUser.js
    if (!validateUser){//se não existir vai da erro
        let message = "O usuario digitado não existe. Deve ser criado o usuario antes";
        let status = 400;
        return res.status(400).render('error.ejs',{message,status});//redirecionar para a pagina de error
    }
    //-----------------------------------------------

    let nomeColecao =new NomeColecao (req.body)
    try {
        let doc =await nomeColecao.save()
        res.redirect ('/');
        
    } catch (error) {
        res.render('add.ejs', { error, body: req.body }); 
    }
}

module.exports={todoDado, redirect, loadDados, addDado};//exportar a funcionalidade 
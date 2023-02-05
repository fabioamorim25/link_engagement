const DocumentUser = require ('../models/DocumentUser');
const Docs=require('../models/Docs') 
const {validateUser,validateDados}= require ('./validate');

//FUNCIONALIDADE PARA ADICIONAR USUÁRIO 
const addUser = async (req, res) => {

    const { error } = validateUser(req.body);

    if (error) {
        let message = error;
        let status = 400;
        return res.status(400).render('error.ejs', { message, status });
    }

    //validar se o nome do usuario já existe
    const selectedUser = await DocumentUser.findOne({ name: req.body.name });
    if (selectedUser) {
        let message = "O Usuario já existe"
        let status = 400;
        return res.status(400).render('error.ejs', { message, status });
    }

    let documentUser = new DocumentUser(req.body)

    try {
        let doc = await documentUser.save();
        res.redirect('/');

    } catch (error) {
        let status = 400;
        let message = error;
        res.status(400).render('error.ejs', { message, status });
    }
}

//FUNCIONALIDADE PARA CARREGAR A PAGINA [listAll] DO USUÁRIO SELECIONADO
const loadUser = async (req, res) =>{
    let id = req.params.id;
     
    try{
        let doc = await DocumentUser.findById(id);
        //DADOS DO MENU
        let name= doc.name; 
        let docs = await Docs.find({user:name});
    
        res.render('listAll.ejs', {error: false , body:doc,name,docs})
    }catch (error){
        let message= error;
        let status = 404;
        res.status(404).render('error.ejs',{message,status});
    }
}

//FUNCIONALIDADE PARA EDITAR DOCUMENTO DO USUARIO
const editDado = async (req,res)=>{
    //chamar a validação dos dados-----------------
    const {error} = validateDados(req.body);
    if(error){
        return res.status(400).render('add.ejs',{error});
    }
    //validar se o titulo do dado já existe---------------------------------
    const selectedTitle = await Docs.findOne({title: req.body.title});
    if (selectedTitle){
        let message = "O titulo já existe";
        let status = 400;
        return res.status(400).render('error.ejs',{message,status});//redirecionar para a pagina de error
    }
    //----------------------------------------------------------------------
    
    let documentoVazio ={};
    documentoVazio.title = req.body.title;
    documentoVazio.description = req.body.description;
    documentoVazio.url = req.body.url;
    
    let id =req.params.id;
    if(!id){
        id= req.body.id;
    }
    try{
        let doc= await Docs.updateOne({_id: id}, documentoVazio);
        res.redirect('/');
    }catch (error){
        res.render('edit.ejs', {error, body:req.body });
    }
}

//FUNCIONALIDADE PARA APAGAR DOCUMENTO DO USUARIO
const deleteDado= async ( req,res )=>{
    //pegar o id do documento
    let id = req.params.id;
    if (!id){
        id= req.body.id;
    }

    try {     
        //deletar o documento que possui o id selecionado
       let deleta = await Docs.findByIdAndDelete(id);
       res.redirect('/')
    } catch (error) {
        let message = error;
        let status = 404;
        res.status(404).render('error.ejs', {message,status});//redirecionar para a pagina de error
    }
}
//FUNCIONALIDADE PARA APAGAR  O USUARIO E SEUS DOCUMENTOS
const deleteUser= async ( req,res )=>{
    //pegar o id do usuario
    let id = req.params.id;
    if (!id){
        id= req.body.id;
    }
    //pegar o documento que possui o id do usuario e selecionar seu nome
    let user = await DocumentUser.findById(id);
    let name = user.name;
    //------------------------------------------------------------------
    //pegar todos os documentos que possui o nome do usuario
    let docsUser = await Docs.find({user:name});
    //------------------------------------------------------------------

    try {     
       //deletar o usuario
       let deltUser= await DocumentUser.findByIdAndDelete(id);
       //deletar os documentos que o usuario possui
       let deltDocs= await Docs.findByIdAndDelete(docsUser);
       res.redirect('/')
    } catch (error) {
        let message = error;
        let status = 404;
        res.status(404).render('error.ejs', {message,status});//redirecionar para a pagina de error
     }
}
//FUNCIONALIDADE PARA CARREGAR A PAGINA [editUser.ejs]
const loadEditUser = async (req, res) =>{
    let name = req.params.name;//pegar o nome do usuario
  
    try {
        let docUser = await DocumentUser.find({name});//procurar o documento com o nome do usuario
        res.render('editUser.ejs', {error: false,name});
    } catch (error) {
        let message = error;
        let status = 404;
        res.status(404).render('error.ejs',{message,status}); //redirecionar para a pagina de error 
    }
}
//FUNCIONALIDADE PARA EDITAR O NOME DO USUARIO E TODOS OS DOCUMENTO DO USUARIO
const editUserName = async (req,res)=>{
    let nameNew = req.body.name;//nome novo
    let nameOriginal =req.params.name;//nome original
    //validar se o nome já existe---------------------------------
    const selectedName = await DocumentUser.findOne({name:req.body.name});//procurar o nome do usuario (nome novo)
    if (selectedName){
        let message = "O nome usado já existe";
        let status = 400;
        return res.status(400).render('error.ejs',{message,status});//redirecionar para a pagina de error
    }
    //----------------------------------------------------------------------
    
    
    try {
        //DOCUMENTO DO USUARIO
        let renameUser = await DocumentUser.updateMany({ name: nameOriginal }, { $set: { name: nameNew } });
        //DOCUMENTOS QUE O USUARIO POSSUI
        //renomear o nome do usuario. Onde, sera selecionado todos os documentos que possui o nome original do usuario
        // assim, sera possivel renomear o nome original para o novo nome em todos os documentos selecionados
        let renameDocs = await Docs.updateMany({ user: nameOriginal }, { $set: { user: nameNew } });
        //{user:nameOriginal} seleciona os documentos que possui o nome original
        //{$set:{user:nameNew} renomea a caracteristica [USER] com o nome novo
        res.redirect('/');

    } catch (error) {
        res.render('edit.ejs', { error, body: req.body });
    }
}




module.exports= {addUser, loadUser,editDado,loadEditUser,editUserName,deleteDado,deleteUser}; 
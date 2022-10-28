const DocumentUser = require ('../modelGenerico/DocumentUser');
const Docs=require('../modelGenerico/Docs') 
const {validateUser,validateDados}= require ('./validate');

//FUNCIONALIDADE PARA ADICIONAR USUÁRIO 
const addUser = async (req, res) => {
    //validar os dado do input nome do novo usuário--
    const { error } = validateUser(req.body);
    if (error) {
        let message = error;
        let status = 400;
        return res.status(400).render('error.ejs',{message,status});//redirecionar para a pagina de error
    }   
    //validar se o nome do usuário já existe-------------------------------
    const selectedUser = await DocumentUser.findOne({name: req.body.name});
    if (selectedUser){
        let message = "o usuario já existe"
        let status = 400;
        return res.status(400).render('error.ejs',{message,status});//redirecionar para a pagina de error
    }
    //---------------------------------------------------------------------

    let documentUser =new DocumentUser (req.body)
    try {
        let doc =await documentUser.save();
        res.redirect ('/');
    } catch (error) {
        let status = 400;
        let message = error;
        res.status(400).render('error.ejs', { message, status }); //redirecionar para a pagina de error
    }
}

//FUNCIONALIDADE PARA CARREGAR A PAGINA [listAll] DO USUÁRIO SELECIONADO
const loadUser = async (req, res) =>{
    let id = req.params.id;//pegar o id do usuário selecionado. Vindo por parâmetro
     
    try{
        let doc = await DocumentUser.findById(id);
        //DADOS DO MENU
        let name= doc.name; 
        let docs = await Docs.find({user:name});
    
        res.render('listAll.ejs', {error: false , body:doc,name,docs})
    }catch (error){
        let message= error;
        let status = 404;
        res.status(404).render('error.ejs',{message,status});//redirecionar para a pagina de error
    }
}

//FUNCIONALIDADE PARA EDITAR DOCUMENTO DO USUARIO
const editDado = async (req,res)=>{
    
    //chamar a validação dos dados-----------------
    const {error} = validateDados(req.body);
    if(error){
        return res.status(400).render('add.ejs',{error});
    }
    //validar se o titulo do dado já existe---------------------------
    const selectedTitle = await Docs.findOne({title: req.body.title});
    if (selectedTitle){
        let message = "O titulo já existe";
        let status = 400;
        return res.status(400).render('error.ejs',{message,status});//redirecionar para a pagina de error
    }
    //---------------------------------------------------------------
    
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
       let deleta = await Docs.findByIdAndDelete(id);//deletar o documento que possui o id selecionado
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
    //pegar o documento que possui o id do usuário e selecionar seu nome
    let user = await DocumentUser.findById(id);
    let name = user.name;
    //------------------------------------------------------------------
    //pegar todos os documentos que possui o nome do usuário
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
    let name = req.params.name;//pegar o nome do usuário
  
    try {
        let docUser = await DocumentUser.find({name});//procurar o documento com o nome do usuário
        res.render('editUser.ejs', {error: false,name});
    } catch (error) {
        let message = error;
        let status = 404;
        res.status(404).render('error.ejs',{message,status}); //redirecionar para a pagina de error 
    }
}
//FUNCIONALIDADE PARA EDITAR O NOME DO USUÁRIO E TODOS OS DOCUMENTO DO USUÁRIO
const editUserName = async (req,res)=>{
    let nameNew = req.body.name;//nome novo
    let nameOriginal =req.params.name;//nome original
    //validar se o nome já existe----------------------------------------
    const selectedName = await DocumentUser.findOne({name:req.body.name});//procurar o nome do usuário (nome novo)
    if (selectedName){
        let message = "O nome usado já existe";
        let status = 400;
        return res.status(400).render('error.ejs',{message,status});//redirecionar para a pagina de error
    }
    //------------------------------------------------------------------
    
    
    try {
        //DOCUMENTO DO USUÁRIO
        let renameUser = await DocumentUser.updateMany({ name: nameOriginal }, { $set: { name: nameNew } });
        //DOCUMENTOS QUE O USUÁRIO POSSUI
        //renomear o nome do usuário. Onde, sera selecionado todos os documentos que possui o nome original do usuário
        // assim, sera possivel renomear o nome original para o novo nome em todos os documentos selecionados
        let renameDocs = await Docs.updateMany({ user: nameOriginal }, { $set: { user: nameNew } });

        res.redirect('/');

    } catch (error) {
        res.render('edit.ejs', { error, body: req.body });
    }
}




module.exports= {addUser, loadUser,editDado,loadEditUser,editUserName,deleteDado,deleteUser};
const DocumentUser = require ('../modelGenerico/DocumentUser');
const NomeColecao=require('../modelGenerico/NomeColecao') 
const {validateUser,validateDados}= require ('./validate');//chamar a função de validação do nome do usuario

//FUNCIONALIDADE PARA ADICIONAR USUARIO 
const addUser = async (req, res) => {
    //validar os dado do input nome do novo usuario--
    const { error } = validateUser(req.body);
    if (error) {
        let message = error;
        let status = 400;
        return res.status(400).render('error.ejs',{message,status});//redirecionar para a pagina de error
    }   
    //validar se o nome do usuario já existe-------------------------------
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

//FUNCIONALIDADE PARA CARREGAR A PAGINA [listAll] DO USUARIO SELECIONADO
const loadUser = async (req, res) =>{
    let id = req.params.id;//pegar o id do usuario selecionado. Vindo por parâmetro
   
    try{
        let doc = await DocumentUser.findById(id);
        //DADOS DO MENU
        let name= doc.name; 
        let docs = await NomeColecao.find({user:name});
    
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
    //validar se o titulo do dado já existe---------------------------------
    const selectedTitle = await NomeColecao.findOne({title: req.body.title});
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
        let doc= await NomeColecao.updateOne({_id: id}, documentoVazio);
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
    //========================[OBS: CRIAR O CODIGO PARA MANDAR MENSAGEM PERGUNTANDO SE REALMENTE VAI QUERER APAGAR ESSE DOCUMENTO]===========================================================================
    try {     
        //deletar o documento que possui o id selecionado
       let deleta = await NomeColecao.findByIdAndDelete(id);
       res.redirect('/')
    } catch (error) {
        let message = error;
        let status = 404;
        res.status(404).render('error.ejs', {message,status});//redirecionar para a pagina de error
    }
}






module.exports= {addUser, loadUser,editDado,deleteDado};//exportar a funcionalidade 
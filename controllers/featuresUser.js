const DocumentUser = require ('../modelGenerico/DocumentUser');
const NomeColecao=require('../modelGenerico/NomeColecao') 
const {validateUser,validateDados}= require ('./validate');//chamar a função de validação do nome do usuario

//FUNCIONALIDADE PARA ADICIONAR DADOS 
const addUser = async (req, res) => {
    //validar os dado do input nome do novo usuario--
    const { error } = validateUser(req.body);
    if (error) {
        return res.status(400).send(error.message);//[DEVE SER MELHORAR A ENTREGA DA MENSAGEM NO FRONT NAS PROXIMA ATUALIZAÇÃO]
    }
    //----------------------------------------------
   
    //validar se o nome do usuario já existe---------
    const selectedUser = await DocumentUser.findOne({name: req.body.name});
    if (selectedUser){
        return res.status(400).send("o usuario já existe");//[DEVE SER MELHORAR A ENTREGA DA MENSAGEM NO FRONT NAS PROXIMA ATUALIZAÇÃO]
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
//FUNCIONALIDADE PARA CARREGAR A PAGINA [listAll] do usuario selecionado
const loadUser = async (req, res) =>{
    let id = req.params.id;//pegar o id do usuario selecionado. Vindo por parametro
   
    try{
        let doc = await DocumentUser.findById(id);//[findById(id)] é usada para recuperar o documento que corresponde ao 'id'. onde [documentUser] é o modelo do documento a ser selecionado
     
    //DADOS DO MENU
     let name= doc.name; //vai pegar apenas o nome do usuario que esta no documento
     let docs = await NomeColecao.find({user:name});// lista com todos os documentos que o usuario possui o nome
    
     res.render('listAll.ejs', {error: false , body:doc,name,docs})//responde com uma pagina que vai conter todo os dados do usuario selecionado pelo id
    }catch (error){
        res.status(404).send(error); 
    }
}


//FUNCIONALIDADE PARA EDITAR DADOS
const editDado = async (req,res)=>{

    //chamar a validação dos dados-----------------
    const {error} = validateDados(req.body);
    if(error){
        return res.status(400).send(error.message);
    }//--------------------------------------------
    //1° parte: validar se o titulo do dado já existe--------------------------------------------------------------------------------
    const selectedUser = await NomeColecao.findOne({title: req.body.title});
    if (selectedUser){
        return res.status(400).send("O titulo já existe");//[DEVE SER MELHORAR A ENTREGA DA MENSAGEM NO FRONT NAS PROXIMA ATUALIZAÇÃO]
    }
    //--------------------------------------------------------------------------------------------------------------------------------
    let documentoVazio ={};
    documentoVazio.user = req.body.user;
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
//======================================================================
//FUNCIONALIDADE PARA APAGAR DOCUMENTO DO USUARIO
const deleteDado= async ( req,res )=>{
    //pegar o id do documento
    let id = req.params.id;
    if (!id){
        id= req.body.id;
    }
    try {     
        //deletar o documento que possui o id selecionado
       let deleta = await NomeColecao.findByIdAndDelete(id);
       res.redirect('/')
        //[OBS: ALTERAR O CODIGO PARA ASSIM QUE DELETAR O DOCUMENTO SELECIONADO SERA REDIRECIONADO PARA A PAFINA DO USUARIO QUE FOI APAGADO O DOCUMENTO]
    } catch (error) {
        res.status(404).send(error);
    }
}






module.exports= {addUser, loadUser,editDado,deleteDado};//exportar a funcionalidade 
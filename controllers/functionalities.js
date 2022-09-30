const NomeColecao=require('../modelGenerico/NomeColecao') 

//FUNCIONALIDADE PARA VER TODOS OS DADOS
const todoDado= async (req,res)=>{
    try { 
        let dados = await NomeColecao.find({});
        res.render('all.ejs', {dados});
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
//FUNCIONALIDADE PARA EDITAR DADOS
const editDado = async (req,res)=>{
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
//======================================================================

//FUNCIONALIDADE PARA APAGAR DADOS
const deleteDado= async ( req,res )=>{
    let id = req.params.id;
    if (!id){
        id= req.body.id;
    }
    try {     
       let deleta = await NomeColecao.findByIdAndDelete(id);
       res.send(id)
    } catch (error) {
        res.status(404).send(error);
    }
}
//FUNCIONALIDADE PARA ADICIONAR DADOS 
const addDado = async (req, res) => {
    let nomeColecao =new NomeColecao (req.body)
    try {
        let doc =await nomeColecao.save()
        res.redirect ('/');
        
    } catch (error) {
        res.render('add.ejs', { error, body: req.body }); 
    }
}

module.exports={todoDado, redirect, loadDados, editDado, deleteDado, addDado};//exportar a funcionalidade 
const NomeColecao= require('../modelGenerico/NomeColecao') 
const {validateDadoUser}= require ('./validate');
const DocumentUser = require ('../modelGenerico/DocumentUser');




//FUNCIONALIDADE PARA VER TODOS OS DOCUMENTOS 
const todoDado= async (req,res)=>{
    try { 
        let users = await DocumentUser.find({});
        //PEGAR OS TODOS OS DOCUMENTOS (selecionar apenas sua url)
        let dados = await NomeColecao.find({},{url:1, _id:0});
        dados = dados.filter(function (a) {
            return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
        }, Object.create(null))


        //1°: FUNCIONALIDADE ORDENAR O DADOS DO QUE TEM MAIS CLICKS PARA OS QUE TEM MENOS CLICKS [sort({click:-1})] E LIMITAR APENAS PARA OS 10 COLOCADOS [limit(10)]
        let listOrderTitule = await NomeColecao.find().sort({click:-1}).limit(10);
      
        res.render('all.ejs', {dados,users,listOrderTitule});//2°: ENVIAR PARA O FRONT END A ORDEM DOS DOCUMENTOS

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
        res.status(404).render('error.ejs', {message,status}); 
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
        res.status(404).render('error.ejs',{message,status}); 
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
        let status = 400;
        return res.status(400).render('error.ejs',{message,status});
    }
    //-----------------------------------------------
    //validar se o usuario do documento existe---------
    const validateUser = await DocumentUser.findOne({name: req.body.user});
    if (!validateUser){
        let message = "O usuario digitado não existe. Deve ser criado o usuario antes";
        let status = 400;
        return res.status(400).render('error.ejs',{message,status});
    }

    let nomeColecao =new NomeColecao (req.body)
    try {
        let doc =await nomeColecao.save()
        res.redirect ('/');
        
    } catch (error) {
        res.render('add.ejs', { error, body: req.body }); 
    }
}

module.exports={todoDado, redirect, loadDados, addDado};//exportar a funcionalidade 
const DocumentUser = require ('../modelGenerico/DocumentUser');
const {validateUser}= require ('./validate');//chamar a função de validação do nome do usuario

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
//2°PARTE: como os dados dessa pagina são dinamicos (depende do id do usuario) sera preciso pegar algumas caracteristicas do documento do usuario, que seram colocados no templete do menu do usuario
const loadUser = async (req, res) => {
    let id = req.params.id;//2.1: pegar o id do usuario selecionado. Vindo por parametro
   
    try {
        let doc = await DocumentUser.findById(id);//2.2: pegar todo o documento do usuario utilizando seu id. para isso usamos o [findById(id)]. Onde [documentUser] é o modelo do documento a ser selecionado
        let name= doc.name; //2.3: selecionar apenas a caracteristica nome desse documento
       
        //após realizar os codigos acima sera respondido para o usuario.
        //2.4: [res.render('listAll.ejs')] renderização do arquivo [listAll.ejs] que sera o templete do menu
        //2.5: [{body:doc,name}] sera passado as informações para o front end. Como o nome do usuario e o documento selecionado. Onde sera enviado pelo body da resposta
        res.render('listAll.ejs', {error: false , body:doc,name})//responde com uma pagina que vai conter todo os dados do usuario selecionado pelo id
    } catch (error) {
        res.status(404).send(error); 
    }
}




module.exports= {addUser, loadUser};//exportar a funcionalidade
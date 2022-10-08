const express= require('express');
const router= express.Router();
const controllerReq=require('../controllers/functionalities')
const featuresUser = require ('../controllers/featuresUser'); //importar o arquivo com as rotas do usuario


//ROTAS PARA AS FUNCIONALIDADES DAS AÇÕES DO SISTEMA

//mostra pagina de add dados e executar a funcionalidade que adiciona os dados ao banco de dados---------------------------
router.get('/add', (req,res)=>{//carregar a pagina para adicionar dados
    res.render('add.ejs');  
});
router.post('/', express.urlencoded({extended:true}), controllerReq.addDado); //ROTA PARA ADICIONAR DADOS AO BANCO DE DADOS
//-------------------------------------------------------------------------------------------------------------------------

router.get('/', controllerReq.todoDado);//rota para mostra todos os dados para o usuario

router.get('/:title', controllerReq.redirect);//rota para iniciar a funcionalidade de redirecionar

//--------------------------------------------------------------------------------------------------------------------
router.post('/edit/:id', express.urlencoded({extended: true}), controllerReq.editDado);//rota para atualizar os dados
router.get('/edit/:id', controllerReq.loadDados); //rota que sera usada para renderizar a pagina que edita os dados
//-------------------------------------------------------------------------------------------------------------------

router.delete('/:id',express.urlencoded({extended: true}), controllerReq.deleteDado);//rota delete 


//ROTAS PARA AS FUNCIONALIDADES DO USUARIO

//rota para adicionar um novo usuario
router.post('/addUser', express.urlencoded({extended:true}), featuresUser.addUser);

//rota para ver todos os usuarios registrados
router.get('/', featuresUser.verUser)




module.exports= router; 
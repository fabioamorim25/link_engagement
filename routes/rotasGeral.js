const express= require('express');
const router= express.Router();
const controllerReq=require('../controllers/functionalities')
const featuresUser = require ('../controllers/featuresUser'); //importar o arquivo com as rotas do usuario


//ROTAS PARA AS FUNCIONALIDADES DAS AÇÕES DO SISTEMA
router.get('/add', (req,res)=>{
    res.render('add.ejs');  
});
router.post('/', express.urlencoded({extended:true}), controllerReq.addDado);

router.get('/', controllerReq.todoDado);
router.get('/:title', controllerReq.redirect);


router.post('/edit/:id', express.urlencoded({extended: true}), controllerReq.editDado);
router.get('/edit/:id', controllerReq.loadDados); 


router.delete('/:id',express.urlencoded({extended: true}), controllerReq.deleteDado);//rota delete 


//ROTAS PARA AS FUNCIONALIDADES DO USUARIO
//rota para adicionar um novo usuario
router.post('/addUser', express.urlencoded({extended:true}), featuresUser.addUser);

//rota para entra no menu do usuario apartir do id 
router.get('/listAll/:id', featuresUser.loadUser);

module.exports= router; 
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

router.delete('/:id',express.urlencoded({extended: true}), controllerReq.deleteDado);


//ROTAS PARA AS FUNCIONALIDADES DO USUARIO
//rota para adicionar um novo usuario
router.post('/addUser', express.urlencoded({extended:true}), featuresUser.addUser);




module.exports= router; 
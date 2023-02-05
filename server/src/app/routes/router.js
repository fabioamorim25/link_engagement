const express= require('express');
const router= express.Router();

const methodOverride= require('method-override')

const functionalities=require('../controllers/functionalities')
const featuresUser = require ('../controllers/featuresUser'); //importar o arquivo com as rotas do usuario

router.use(methodOverride('_method'));//o methodOverride foi selecionado para a rota de deletar dados do usuario 




//ROTAS PARA AS FUNCIONALIDADES DAS AÇÕES DO SISTEMA__________________________________
router.get('/add', (req,res)=>{
    res.render('add.ejs',{error:false,message:false});  
});
router.post('/', express.urlencoded({extended:true}), functionalities.addDado);

router.get('/', functionalities.todoDado);
router.get('/:title', functionalities.redirect);

router.get('/edit/:id', functionalities.loadDados); 



//ROTAS PARA AS FUNCIONALIDADES DO USUARIO____________________________________________

//rota para adicionar um novo usuario
router.post('/addUser', express.urlencoded({extended:true}), featuresUser.addUser);
//rota para entra no menu do usuario apartir do id 
router.get('/listAll/:id', featuresUser.loadUser);

//rota para editar um documento apartir do usuario
router.post('/edit/:id', express.urlencoded({extended: true}), featuresUser.editDado);

//rota para entra na pagina de editar o nome do usuario
router.get('/editUser/:name', featuresUser.loadEditUser);
//rota para editar um documento apartir do usuario
router.post('/editName/:name', express.urlencoded({extended: true}), featuresUser.editUserName);

//rota para deletar um documento do usuario 
router.delete('/:id',express.urlencoded({extended: true}), featuresUser.deleteDado);
//rota para deletar o usuario 
router.delete('/deleteUser/:id',express.urlencoded({extended: true}), featuresUser.deleteUser);





module.exports = (app)=>{   
    app.use('/', router);
} 
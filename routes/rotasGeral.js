const express= require('express');
const router= express.Router();
const methodOverride= require('method-override')
const functionalities=require('../controllers/functionalities')
const featuresUser = require ('../controllers/featuresUser');

router.use(methodOverride('_method'));//o methodOverride foi selecionado para a rota de deletar dados do usuário 


//ROTAS PARA AS FUNCIONALIDADES DAS AÇÕES DO SISTEMA__________________________________
router.get('/add', (req,res)=>{
    res.render('add.ejs',{error:false,message:false});  
});
router.post('/', express.urlencoded({extended:true}), functionalities.addDado);

router.get('/', functionalities.todoDado);
router.get('/:title', functionalities.redirect);

router.get('/edit/:id', functionalities.loadDados); 



//ROTAS PARA AS FUNCIONALIDADES DO USUÁRIO____________________________________________

//rota para adicionar um novo usuário
router.post('/addUser', express.urlencoded({extended:true}), featuresUser.addUser);
//rota para entra no menu do usuário apartir do id 
router.get('/listAll/:id', featuresUser.loadUser);

//rota para editar um documento apartir do usuário
router.post('/edit/:id', express.urlencoded({extended: true}), featuresUser.editDado);

//rota para entra na pagina de editar o nome do usuário
router.get('/editUser/:name', featuresUser.loadEditUser);
//rota para editar um documento apartir do usuário
router.post('/editName/:name', express.urlencoded({extended: true}), featuresUser.editUserName);

//rota para deletar um documento do usuário 
router.delete('/:id',express.urlencoded({extended: true}), featuresUser.deleteDado);
//rota para deletar o usuário 
router.delete('/deleteUser/:id',express.urlencoded({extended: true}), featuresUser.deleteUser);





module.exports= router; 
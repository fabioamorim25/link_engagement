const express= require('express');
const path= require('path'); 
const app= express();




//setar a localização dos templates
app.set("views", path.join(__dirname+"/app", "pages"));
app.set('views engine', 'ejs'); 




//DEFINIR AS ROTAS
require('../src/app/routes/index')(app);



module.exports = app;
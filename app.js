const PORT= 3000;
const express= require('express');
const app= express();
const mongoose = require('mongoose');
const rotasGeral= require('./routes/rotasGeral');
const path= require('path'); 




//-------------------------------------------------------
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/dbLinkEngagement',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}); 
mongoose.Promise = global.Promise;
//--------------------------------------------------------


    

//Verificação da conexão com o banco de dados
let db=mongoose.connection;
db.on("error", ()=>{
    console.log(error)
})
db.once("open", ()=>{
    console.log("banco de dados carregado")
})


//==================================================
app.set("views", path.join(__dirname, "templates"));
app.set('views engine', 'ejs'); 
//==================================================



app.use('/',rotasGeral)



app.listen(PORT, (req,res)=>{
    console.log("servidor esperando requisições");
})
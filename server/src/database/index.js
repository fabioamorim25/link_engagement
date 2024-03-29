const mongoose = require('mongoose');



mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGO_CONNECTION_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}); 
mongoose.Promise = global.Promise;



    

//Verificação da conexão com o banco de dados
let db=mongoose.connection;
db.on("error", ()=>{
    console.log(error)
})
db.once("open", ()=>{
    console.log("Banco de dados carregado")
})


module.exports = mongoose;
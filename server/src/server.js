const dotenv = require('dotenv').config();

const app = require('./app');
const mongoose = require('../src/database/index');











app.listen(process.env.PORT || PORT, ()=>{
    console.log("Servidor rodando na porta:", process.env.PORT);
});
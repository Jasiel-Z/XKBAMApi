const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const app = express()

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
var corsOptions = {
    origin:["http://localhost:3001", "http://localhost:8080"],
    methods: "GET, PUT,POST,DELETE"
}


app.use("/api/usuarios", require('./routes/usuarios.routes'))
app.get('*',(req,res) => { res.status(200).send('Bienvenido a nuestra API') });


app.listen(process.env.SERVER_PORT, () =>{
    console.log(`Aplicación de ejemplo escuchando en el puerto ${process.env.SERVER_PORT}`)
} )
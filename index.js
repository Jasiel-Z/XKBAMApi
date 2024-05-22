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
app.use("/api/cuentasbancarias", require('./routes/cuentasbancarias.routes'))
app.use("/api/direcciones", require('./routes/direcciones.routes'))
app.use("/api/categorias", require('./routes/categorias.routes'))
app.use("/api/colores", require('./routes/colores.routes'))
app.use("/api/tallas", require('./routes/tallas.routes'))
app.use("/api/opiniones", require('./routes/opiniones.routes'))
app.use("/api/compras", require('./routes/compras.routes'))

app.get('*',(req,res) => { res.status(200).send('Bienvenido a nuestra API') });


app.listen(process.env.SERVER_PORT, () =>{
    console.log(`Aplicación de ejemplo escuchando en el puerto ${process.env.SERVER_PORT}`)
} )
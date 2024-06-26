const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const app = express()
const logRequest = require('./logs/requestlogger');

dotenv.config();

//configuraciones de swagger
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger-output.json')

app.use(express.json());
app.use(express.urlencoded({ extended: false}));



var corsOptions = {
    origin:["http://localhoss:3000", "http://localhost:8080"],
    methods: "GET,PUT,POST,DELETE"
}

app.use(cors(corsOptions));

app.use(logRequest);

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use("/api/usuarios", require('./routes/usuarios.routes'))
app.use("/api/cuentasbancarias", require('./routes/cuentasbancarias.routes'))
app.use("/api/direcciones", require('./routes/direcciones.routes'))
app.use("/api/carritos", require('./routes/carritos.routes'))
app.use("/api/categorias", require('./routes/categorias.routes'))
app.use("/api/colores", require('./routes/colores.routes'))
app.use("/api/tallas", require('./routes/tallas.routes'))
app.use("/api/opiniones", require('./routes/opiniones.routes'))
app.use("/api/compras", require('./routes/compras.routes'))
app.use("/api/autenticacion", require('./routes/autenticacion.routes'))
app.use("/api/articulos", require('./routes/articulos.routes'))
app.use("/api/multimedia", require('./routes/multimedia.routes'))



app.get('*',(req,res) => { res.status(200).send('Bienvenido a nuestra API') });


const errorLogger = require('./middlewares/logger');
const errorHandler = require('./middlewares/validationerrorhandler');
app.use(errorLogger, errorHandler);

app.listen(process.env.SERVER_PORT, () =>{
    console.log(`Aplicación de ejemplo escuchando en el puerto ${process.env.SERVER_PORT}`)
} )
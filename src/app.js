const express = require ('express');
const app = express();

const path = require('path');

const pathPublic = path.resolve(__dirname, '../public');
app.use(express.static(pathPublic));

//Trear rutas en constantes//
const mainRouter = require('./routes/main');

//Uso de Templates Engines//
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

//Llamamos todas las rutas en la app//
app.use('/', mainRouter);

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const port = 4600;
app.listen(port, () => {
    console.log(`Server started on: http://localhost:${port}`);
});
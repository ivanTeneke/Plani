const express = require('express');
const mainController = require('../controllers/mainController');
const secretariasController = require('../controllers/secretariasController');
const router = express.Router();

router.get("/", mainController.index);
router.get("/products/noticias", mainController.noticias);
router.get("/usuarios/users", mainController.usuarios);


router.get("/secretarias/cultura_educacion", secretariasController.cultura_educacion);
router.get("/secretarias/ambiente", secretariasController.ambiente);
router.get("/secretarias/economico", secretariasController.economico);
router.get("/secretarias/gobierno", secretariasController.gobierno);
router.get("/secretarias/hacienda", secretariasController.hacienda);
router.get("/secretarias/humano", secretariasController.humano);
router.get("/secretarias/infraestructura", secretariasController.infraestructura);
router.get("/secretarias/intendencia", secretariasController.intendencia);
router.get("/secretarias/movilidad", secretariasController.movilidad);
router.get("/secretarias/salud", secretariasController.salud);
router.get("/secretarias/territoriales", secretariasController.territoriales);
router.get("/secretarias/tribunal_faltas", secretariasController.tribunal_faltas);
router.get("/secretarias/turismo_deporte", secretariasController.turismo_deporte);
router.get("/secretarias/urbano", secretariasController.urbano);


module.exports=router;
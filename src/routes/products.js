// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer')
const path = require ('path')

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/products')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
   
  var upload = multer({ storage: storage })


/*** todos los productos ***/ 
router.get('/', productsController.index); 

/*** crear producto ***/ 
router.get('/create', productsController.create); 
router.post('/', upload.any(), productsController.store); 


/*** detalles de producto ***/ 
router.get('/detail/:id', productsController.detail); 

/*** Editar producto ***/ 
router.get('/edit/:id', productsController.edit); 
router.patch('/:id', upload.any(), productsController.update); 


/*** Para borrar un producto***/ 
router.delete('/delete/:id', productsController.destroy); 


module.exports = router;
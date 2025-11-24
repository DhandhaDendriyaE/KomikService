const express = require('express');
const router = express.Router();
const multer = require('multer');
const komikController = require('../controllers/komikController');
const { getKomikById } = require('../services/komikServices');
const upload = multer({ storage : multer.memorystorage}());

router.post('/komik', upload.single('gambar'), komikController.createKomik);
router.get('/komik', komikController.getAllKomik);
router.get('/komik/:id', komikController,getKomikById);
router.get('/komik/:id', upload.single('gambar'), komikController.updateKomik);
router.delete('/komik/:id', komikController.deleteKomik);

module.exports = router;
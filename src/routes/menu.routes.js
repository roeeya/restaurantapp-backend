const router = require('express').Router();

const MenuController = require('../controllers/menu.controller');
const multer = require('multer');
const MenuStorage = multer.diskStorage(
    {
        destination: './assets/menu_files',
        filename: (res, file, cb) => {
            filen = Date.now() + '.' + file.mimetype.split('/')[1];
            cb(null, filen);
        }
    })

const upload = multer({ storage: MenuStorage });
router.post('/', upload.any('img'), MenuController.create);
router.get('/', MenuController.findAll);
router.get('/:id', MenuController.findMenuById);
router.get('/getbyweight/:weight', MenuController.findMenuByWeight);
router.put('/:id', upload.any('img'), MenuController.updateMenu);
router.delete('/:id', MenuController.deleteMenu);





module.exports = router;

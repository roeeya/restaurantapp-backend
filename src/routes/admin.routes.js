const router = require('express').Router();

const AdminController = require('../controllers/admin.controller');

router.post('/', AdminController.register);
router.post('/login', AdminController.login);
router.get('/', AdminController.findAll);
router.get('/:id', AdminController.findAdminById);
router.put('/:id', AdminController.updateAdmin);
router.delete('/:id', AdminController.deleteAdmin);


module.exports = router;
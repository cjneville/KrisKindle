const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', userController.user_index);
router.get('/create', userController.user_create_get);
router.post('/add', userController.user_create_post);
router.get('/:id', userController.user_details);
router.delete('/:id', userController.user_delete);
router.post('/edit/:id', userController.user_update);
//router.put('/:id', userController.user_put);
router.post('/toggle/:id', userController.user_put);
router.post('/assign', userController.user_assign);

module.exports = router;


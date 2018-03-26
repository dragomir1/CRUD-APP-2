const express = require('express');
const router = express.Router();
const UsersController = require('./../controllers/users');

router.get('/', UsersController.show_users);
router.get('/newuser', UsersController.goToNew);
router.get('/user/:id', UsersController.userinfo);



router.post('/edit/:id', UsersController.goToEdit);
router.post('/:id', UsersController.edit_user);
router.post('/addUserForm', UsersController.add_new_user);
router.post('/destroy/:id', UsersController.delete_user);


module.exports = router;

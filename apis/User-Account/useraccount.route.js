const { Router } = require("express");
const { userAuth } = require("../../middlewares/auth");
const UserAccountController = require("./useraccount.controller");
const { CreateUserAccountDTO } = require("./useraccount.dto");
const router = Router();

router.get('/', userAuth, UserAccountController.get)
router.post('/', userAuth, CreateUserAccountDTO, UserAccountController.createUserAccount)
router.patch('/:id', userAuth, UserAccountController.updateUserAccount)
router.delete('/:id', userAuth, UserAccountController.deleteUserAccount)
router.post('/login', UserAccountController.login)
module.exports = router;
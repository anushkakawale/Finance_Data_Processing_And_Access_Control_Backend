const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticate = require('../middlewares/auth');
const authorize = require('../middlewares/authorize');
const validate = require('../middlewares/validate');
const { userUpdateSchema } = require('../utils/validators');

// Authentication and Admin authorization applied to all user routes
router.use(authenticate, authorize(['Admin']));

router.get('/', userController.getAllUsers);
router.put('/:id', validate(userUpdateSchema), userController.updateUserStatusOrRole);
router.delete('/:id', userController.deleteUser);

module.exports = router;

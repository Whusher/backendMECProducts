const express = require('express');
const router = express.Router();

// Controller for user actions
const UserController = require('../../controllers/UserController');

router.post('/addUser', UserController.addUser);
router.get('/getAllUsers', UserController.getAllUsers);
router.get('/getUserById/:id', UserController.getUserById);
router.delete('/deleteUser/:id', UserController.deleteUser);
router.put('/updateUser/:id', UserController.updateUser);

module.exports = router;

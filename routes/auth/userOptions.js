const express = require('express');
const router = express.Router();
//Controllers imports
const AccessController = require('../../controllers/AccessController');

router.post('/login', AccessController.signIn);
router.post('/signup',AccessController.signUp);
router.post('/signout',AccessController.signOut);
router.get('/getBrands', AccessController.brands);

module.exports = router;
const { Router } = require('express');
const router = Router();
const userControllers = require('../controllers/userControllers')

router.post('/login', userControllers.login);
router.post('/add', userControllers.add_user);
router.get('/find', userControllers.find_user);

module.exports = router
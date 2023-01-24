const { Router } = require('express');
const router = Router();
const HeroesController = require('../controllers/HeroesController');
router.get('/', HeroesController.getHeroes);
module.exports = router;

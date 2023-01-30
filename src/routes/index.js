const { Router } = require('express');
const router = Router();
const HeroesController = require('../controllers/HeroesController');

router.get('/', HeroesController.getHeroes);
router.get('/details/{id}', HeroesController.getHeroes);
router.post("/search", HeroesController.searchHeroes);
module.exports = router;

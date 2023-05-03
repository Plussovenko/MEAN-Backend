const express = require('express');
const controller = require('../controllers/category')
const passport = require('passport');
const router = express.Router();


router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll)

router.get('/:id', controller.getCategoryById)

router.delete('/:id', controller.removeCategory)

router.post('/', controller.createCategory)

router.patch('/:id', controller.updateCategory)


module.exports = router;
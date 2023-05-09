const express = require('express');
const passport = require('passport');

const upload = require('../middleware/upload');
const controller = require('../controllers/category')
const router = express.Router();


router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll)

router.get('/:id', passport.authenticate('jwt', {session: false}), controller.getCategoryById)

router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.removeCategory)

router.post('/', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.createCategory)

router.patch('/:id', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.updateCategory)


module.exports = router;
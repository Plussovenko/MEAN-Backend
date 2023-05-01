const express = require('express');
const controller = require('../controllers/category')
const router = express.Router();


router.get('/', controller.getAll)

router.get('/:id', controller.getCategoryById)

router.delete('/:id', controller.removeCategory)

router.post('/', controller.createCategory)

router.patch('/:id', controller.updateCategory)


module.exports = router;
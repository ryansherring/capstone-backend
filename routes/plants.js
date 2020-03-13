const express = require('express');
const router = express.Router();
const controller = require('../controllers');

/* add plant */
router.post('/add', controller.Plants.addPlant)

/* Get plants*/
router.get('/all', controller.Plants.getPlants);

/* Get single plant*/
router.get('/:id', controller.Plants.getPlant);

/* Edit Post */
router.put("/:id", controller.Plants.editPlant);

/* Delete Post */
router.delete("/:id", controller.Plants.removePlant);

module.exports = router;
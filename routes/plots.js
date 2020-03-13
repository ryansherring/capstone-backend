const express = require('express');
const router = express.Router();
const controller = require('../controllers')

router.post('/create', controller.plots.createPlot)

router.get('/all', controller.plots.getPlots)

router.get('/:id/all', controller.plots.getPlantsInPlot)

router.get('/show/:id', controller.plots.showPlot)

router.get('/index', controller.plots.index)

router.put('/:id', controller.plots.editPlot)

router.put('/:id/:plantId', controller.plots.addPlantToPlot)

router.delete('/:id', controller.plots.destroyPlot)

router.delete('/:id/:plantId', controller.plots.removePlantFromPlot)

module.exports = router;

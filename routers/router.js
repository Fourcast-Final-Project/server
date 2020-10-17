const router = require('express').Router()
const UserController = require('../controllers/userController.js')
const LocationController = require('../controllers/locationController')
const SubscribeController = require('../controllers/subscribeController')
// User
router.post('/register', UserController.register)
router.post('/login', UserController.login)

// Location
router.post('/locations', LocationController.createLocation)
router.get('/locations', LocationController.getAllLocation)
router.get('/locations/:id', LocationController.getByIdLocation)
router.put('/locations/:id', LocationController.editLocation)
router.delete('/locations/:id', LocationController.destroyLocation)

router.post('/subscribes', SubscribeController.create)
router.get('/subscribes', SubscribeController.readAll)
router.get('/subscribes/:id', SubscribeController.readOne)
router.delete('/subscribes', SubscribeController.deleteAll)
router.delete('/subscribes/:id', SubscribeController.deleteOne)

module.exports = router

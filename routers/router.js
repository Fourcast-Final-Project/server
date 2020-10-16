const router = require('express').Router()
const UserController = require('../controllers/userController.js')
const LocationController = require('../controllers/locationController')
// User
router.post('/register', UserController.register)
router.post('/login', UserController.login)

// Location
router.post('/locations', LocationController.createLocation)
router.get('/locations', LocationController.getAllLocation)
router.get('/locations/:id', LocationController.getByIdLocation)
router.put('/locations/:id', LocationController.editLocation)
router.delete('/locations/:id', LocationController.destroyLocation)

module.exports = router

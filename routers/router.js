const router = require('express').Router()
const UserController = require('../controllers/userController.js')
const LocationController = require('../controllers/locationController')
// User
router.post('/register', UserController.register)
router.post('/users/login', UserController.login)

// Location
router.post('/location', LocationController.createLocation)
router.get('/location', LocationController.getAllLocation)
router.get('/location/:id', LocationController.getByIdLocation)
router.put('/location/:id', LocationController.editLocation)
router.delete('/location/:id', LocationController.destroyLocation)

module.exports = router

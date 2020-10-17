const router = require('express').Router()
const UserController = require('../controllers/userController.js')
const LocationController = require('../controllers/locationController')
const SubscribeController = require('../controllers/subscribeController')
const HistoryController = require('../controllers/historyController')
const APIController = require('../controllers/apiController.js')


// User
router.post('/register', UserController.register)
router.post('/login', UserController.login)

// Location
router.post('/locations', LocationController.createLocation)
router.get('/locations', LocationController.getAllLocation)
router.get('/locations/:id', LocationController.getByIdLocation)
router.put('/locations/:id', LocationController.editLocation)
router.delete('/locations/:id', LocationController.destroyLocation)

// Subscribe
router.post('/subscribes', SubscribeController.create)
router.get('/subscribes', SubscribeController.readAll)
router.get('/subscribes/:id', SubscribeController.readOne)
router.delete('/subscribes', SubscribeController.deleteAll)
router.delete('/subscribes/:id', SubscribeController.deleteOne)

// History
router.post('/histories', HistoryController.create)
router.get('/histories', HistoryController.readAll)
router.get('/histories/:id', HistoryController.readOne)
router.delete('/histories', HistoryController.deleteAll)
router.delete('/histories/:id', HistoryController.deleteOne)


// API weather

router.get('/weather/:loc', APIController.show)



module.exports = router

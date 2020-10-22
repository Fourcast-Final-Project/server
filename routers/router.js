const router = require('express').Router()
const UserController = require('../controllers/userController.js')
const LocationController = require('../controllers/locationController')
const SubscribeController = require('../controllers/subscribeController')
const HistoryController = require('../controllers/historyController')
const authentication = require('../middlewares/authentication')
const { historyAuthorization, subscribeAuthorization } = require('../middlewares/authorization')
const APIController = require('../controllers/apiController.js')


// User
router.post('/register', UserController.register)
router.post('/login', UserController.login)
// router.delete('/logout', UserController.logout)

// Location

router.get('/locations/search/:query', LocationController.search)
router.get('/locations/find/:query', LocationController.searchInSearch)
router.get('/locations', LocationController.getAllLocation)
router.post('/locations', LocationController.createLocation)
router.get('/locations/:id', LocationController.getByIdLocation)
router.put('/locations/:id', authentication, LocationController.editLocation)
// router.put('/locations/report/:id', LocationController.report)
// router.delete('/locations/:id', LocationController.destroyLocation)

router.use(authentication)

// Subscribe
router.post('/subscribes', SubscribeController.create)
router.get('/subscribes', SubscribeController.readAll)
router.get('/subscribes/:id', subscribeAuthorization, SubscribeController.readOne)
router.delete('/subscribes', SubscribeController.deleteAll)
router.delete('/subscribes/:id', subscribeAuthorization, SubscribeController.deleteOne)

// History
router.post('/histories', HistoryController.create)
router.get('/histories', HistoryController.readAll)
// router.get('/histories/:id', historyAuthorization, HistoryController.readOne)
router.get('/histories/:id', HistoryController.fetchByLocation)
router.delete('/histories', HistoryController.deleteAll)
router.delete('/histories/:id', historyAuthorization, HistoryController.deleteOne)


// API weather

router.get('/weather/:loc', APIController.show)



module.exports = router

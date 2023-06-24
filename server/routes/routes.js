const express = require('express')
const router = express.Router()
const { authorization } = require('../middlewares/authorization')
const controllers = require('../controllers/controllers')

router.get('/initdb', controllers.initdb)
router.post('/login', controllers.login)
router.post('/register', controllers.register)


router.use(authorization)
router.get('/api/recruitment/positions.json', controllers.getJobList)
router.get('/api/recruitment/positions/:id', controllers.getJobDetail)

module.exports = router
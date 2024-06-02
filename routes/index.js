const router = require('express').Router()

const thoughtRoutes = require('./api/thought_routes')
const userRoutes = require('./api/user_routes')

router.use('/api', [userRoutes,thoughtRoutes])


module.exports = router
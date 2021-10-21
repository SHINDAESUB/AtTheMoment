const express = require("express")
const scheduleRoutes = require('./schedule')

const router = express.Router()

router.use('/schedule', scheduleRoutes)

module.exports = router;
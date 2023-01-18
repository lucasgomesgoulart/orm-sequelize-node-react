const bodyParser = require('body-parser')
const userRoute = require('./userRoute')
const adminRoute = require('./adminRoute')
const cors = require('cors')

module.exports = app => {
    app.use(
        bodyParser.json(),
        cors(),
        userRoute,
        adminRoute
    )
}

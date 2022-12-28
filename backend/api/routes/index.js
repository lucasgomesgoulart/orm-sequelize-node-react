const bodyParser = require('body-parser')
const userRoute = require('./userRoute')
const cors = require('cors')

module.exports = app => {
    app.use(
        bodyParser.json(),
        cors(),
        userRoute,
    )
}

const bodyParser = require('body-parser')
const routes = require('../../routes')
const cors = require('cors')
const authMiddleware = require('../middlewares/auth.middleware')

module.exports = app => {
    app.use(
        bodyParser.json(),
        cors(),
        routes
    )
}

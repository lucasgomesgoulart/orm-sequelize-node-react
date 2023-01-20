const { Router } = require('express')
const AdminController = require('../controllers/AdminController')

const router = Router()

router.post('/register', AdminController.createAdmin)
router.get('/getadmin/:id', AdminController.findOneAdmin)
router.post('/login', AdminController.login)
// router.post('/users', AdminController.createUser)
// router.put('/users/:id', UserController.updateUser)
// router.delete('/users/:id', UserController.deleteUser)

module.exports = router
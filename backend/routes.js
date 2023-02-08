const { Router } = require('express')
const UserController = require('./api/controllers/UserController')
const AdminController = require('./api/controllers/AdminController')
const authMiddleware = require('./api/middlewares/auth.middleware')

const router = Router()

// Rota de ADM
router.post('/register', AdminController.createAdmin)
router.get('/getadmin/:id', authMiddleware, AdminController.findOneAdmin)
router.post('/login', AdminController.login)
router.post('/getreport', authMiddleware, AdminController.getReport)

// Rota de usuário
router.get('/users', authMiddleware, UserController.findAllUsers)
router.get('/usersFindOne/:id', authMiddleware, UserController.findOneUser)
router.post('/users', authMiddleware, UserController.createUser)
router.put('/users/:id', authMiddleware, UserController.updateUser)
router.delete('/users/:id', authMiddleware, UserController.deleteUser)

module.exports = router

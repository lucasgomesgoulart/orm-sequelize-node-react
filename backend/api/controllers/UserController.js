const db = require('../models')

class UserController {
    static async findAllUsers(req, res) {
        try {
            const allUsers = await db.Users.findAll()
            return res.status(200).json(allUsers)
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: error.message })
        }
    }

    static async findOneUser(req, res) {
        const { id } = req.params
        try {
            const userFound = await db.Users.findOne({ where: { id } })
            if (!userFound) {
                return res.status(404).json({ message: 'User not found' })
            }
            return res.status(200).json(userFound)
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: error.message })
        }
    }

    static async createUser(req, res) {
        const userToCreate = req.body
        try {
            const newUser = await db.Users.create(userToCreate)
            return res.status(201).json({
                message: 'User created successfully',
                data: newUser
            })
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: error.message })
        }
    }

    static async updateUser(req, res) {
        const { id } = req.params
        const userToUpdate = req.body
        try {
            const userFound = await db.Users.findOne({ where: { id } })
            if (!userFound) {
                return res.status(404).json({ message: 'User not found' })
            }
            const updatedUser = await db.Users.update(userToUpdate, { where: { id } })
            return res.status(200).json({
                message: 'User updated successfully',
                data: updatedUser
            })
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: error.message })
        }
    }

    static async deleteUser(req, res) {
        const { id } = req.params
        try {
            const userFound = await db.Users.findOne({ where: { id } })
            if (!userFound) {
                return res.status(404).json({ message: 'User not found' })
            }
            const userToDelete = await db.Users.destroy({ where: { id } })
            return res.status(200).json({
                message: 'User deleted successfully',
                data: userToDelete
            })
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: error.message })
        }
    }
}

module.exports = UserController

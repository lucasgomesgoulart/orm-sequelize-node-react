const db = require('../models')
const UserService = require('../services/userService')

class UserController {


    static async findAllUsers(req, res) {

        try {
            const allUsers = await UserService.findAllUsers(req.admin);
            return res.status(200).json(allUsers)
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: error.message })
        }
    }

    static async findOneUser(req, res) {
        const { id } = req.params
        try {
            const userFound = await UserService.findOneUser(id)
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
        const userToCreate = { ...req.body, admin_id: req.admin }
        const admin_id = req.admin
        userToCreate.admin_id = admin_id

        try {
            const newUser = await UserService.createUser(userToCreate)
            await db.Logs.create({
                description: `Create user: ${newUser.name}`,
                admin_id: req.admin
            })
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
            const updatedUser = await UserService.updateUser(id, userToUpdate)
            await db.Logs.create({
                description: `Updated user: ${userToUpdate.name}`,
                admin_id: req.admin
            })
            return res.status(200).json({
                message: 'User updated successfully',
                data: updatedUser
            })
        } catch (error) {
            if (error.message === "Invalid phone number") return res.status(422).json({ message: error.message });
            if (error.message === "User not found") return res.status(404).json({ message: error.message });
            return res.status(500).json({ message: error.message });
        }
    }


    static async deleteUser(req, res) {
        const { id } = req.params;
        try {
            const result = await UserService.deleteUser(id)
            const deletedUser = result.deletedUser
            const userFoundName = result.userFound.name
            
            await db.Logs.create({
                description: `Delete user: ${userFoundName}`,
                admin_id: req.admin
            })
            return res.status(200).json({
                message: 'User deleted successfully',
                data: deletedUser
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: error.message });
        }
    }

}

module.exports = UserController

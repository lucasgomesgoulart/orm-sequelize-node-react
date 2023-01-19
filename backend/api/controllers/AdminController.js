const db = require('../models')
const bcrypt = require('bcrypt')

class AdminController {
    static async createAdmin(req, res) {
        const adminToCreate = req.body

        const salt = bcrypt.genSaltSync(10)
        adminToCreate.password = bcrypt.hashSync(adminToCreate.password, salt)

        try {
            const newAdmin = await db.Admins.create(adminToCreate)
            return res.status(201).json({
                message: 'Admin created successfully',
                data: newAdmin
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: error.message })
        }
    }

    static async findOneAdmin(req, res) {
        const { id } = req.params
        try {
            const adminFound = await db.Admins.findOne({
                where: { id }
            })
            if (!adminFound) {
                return res.status(404).json({ message: 'Admin not found' })
            }
            return res.status(200).json(adminFound)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }

    // static async validadeAdmin(req, res) {
    //     const { username, password } = req.body

    //     try {
    //         const adminFound = await db.Admins.findOne({
    //             where:
    //             {
    //                 username: adminFound.username,
    //                 password: adminFound.password
    //             })
    //     }
    //         if (!adminFound) {
    //         return res.status(404).json({ message: 'Admin not found' })
    //     }
    // } catch(error) {
    //     console.error(error)
    // }
}

module.exports = AdminController
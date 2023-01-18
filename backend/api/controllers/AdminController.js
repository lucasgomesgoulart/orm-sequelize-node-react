const db = require('../models')


class AdminController {
    static async createAdmin(req, res) {
        const admiToCreate = req.body

        try {
            const newAdmin = await db.Admins.create(admiToCreate)
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
        }catch(error) {
            return res.status(500).json({ message: error.message })
        }
    }
}

module.exports = AdminController
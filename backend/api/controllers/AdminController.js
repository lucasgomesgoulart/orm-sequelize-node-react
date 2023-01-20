const db = require('../models')
const bcrypt = require('bcrypt')
const AdminService = require('../services/adminService');

class AdminController {
    static async createAdmin(req, res) {
        const admiToCreate = req.body

        try {
            const newAdmin = await AdminService.createAdmin(admiToCreate)
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
            const adminFound = await AdminService.findOneAdmin(id)
            return res.status(200).json({ adminFound })
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }
}

module.exports = AdminController
const AdminService = require('../services/adminService');
const fs = require('fs')

class AdminController {
    static async createAdmin(req, res) {
        const admiToCreate = req.body

        try {
            const newAdmin = await AdminService.createAdmin(admiToCreate)
            console.log(newAdmin)
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

    static async login(req, res) {
        const { admin_username, admin_password } = req.body
        try {
            const userLogged = await AdminService.login(admin_username, admin_password)
            console.log(userLogged)
            return res.status(200).json({ userLogged })
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    }

    static async getReport(req, res) {
        const admin_id = req.admin
        const initialDate = req.body.initialDate
        const finalDate = req.body.finalDate

        try {
            const report = await AdminService.getReport(admin_id, initialDate, finalDate)

            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', `attachment; filename=report.csv`);
            res.status(200).send(report);
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }
}

module.exports = AdminController
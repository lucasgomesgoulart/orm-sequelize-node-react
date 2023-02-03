require('dotenv').config()
const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AdminSerivce {

    static async createAdmin(adminToCreate) {
        // console.log(adminToCreate.admin_password)
        const admin_password = bcrypt.hashSync(adminToCreate.admin_password, 8)
        const newAdmin = await db.Admins.create({ ...adminToCreate, admin_password })
        return newAdmin;
    }

    static async findOneAdmin(id) {
        try {
            const adminFound = await db.Admins.findOne({ where: { id } })
            if (!adminFound) {
                throw new Error('Admin not found')
            }
            return adminFound;
        } catch (error) {
            console.log({ error })
        }
    }

    static async login(admin_username, admin_password) {
        try {
            const adminFound = await db.Admins.findOne({ where: { admin_username } });
            if (!adminFound) {
                throw new Error('Admin not found');
            }
            if (await bcrypt.compare(admin_password, adminFound.admin_password)) {
                const token = jwt.sign({ admin_id: adminFound.id }, process.env.JWT_SECRET);
                return {admin_id: adminFound.id, token};
            } else {
                throw new Error('Wrong password');
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = AdminSerivce;
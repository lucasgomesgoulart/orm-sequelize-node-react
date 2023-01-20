const db = require('../models');

class AdminSerivce {
    static async createAdmin(adminToCreate) {
        try {
            const newAdmin = await db.Admins.create(adminToCreate);
            return newAdmin;
        } catch (err) {
            console.log(err)
        }

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
}

module.exports = AdminSerivce;
const db = require('../models')

class UserService {

    static async createUser(userToCreate) {
        try {
            const newUser = await db.Users.create(userToCreate)
            return newUser;
        } catch (error) {
            throw error;
        }
    }

    static async findOneUser(id) {
        if (!id) throw new Error('User id is required')

        try {
            const userFound = await db.Users.findOne({ where: { id } });
            if (!userFound) {
                throw new Error('User not found');
            }
            return userFound
        } catch (error) {
            throw error;
        }
    }


    static async findAllUsers(admin_id) {
        try {
            const users = await db.Users.findAll({ where: { admin_id } });
            return users
        } catch (error) {
            throw error;
        }
    }

    static async updateUser(id, userToUpdate) {
        if (!userToUpdate || !id) return { message: "User not found" }
        if (userToUpdate.phone.length < 10) return { message: "Invalid phone number" }
        try {
            const userFound = await db.Users.findByPk(id)
            if (!userFound) {
                throw new Error('User not found');
            }
            const updatedUser = await db.Users.update(userToUpdate, { where: { id } })
            return updatedUser;
        } catch (error) {
            throw error;
        }
    }

    static async deleteUser(id) {

        if (!id) throw new Error;
        try {
            const userFound = await db.Users.findByPk(id)
            if (!userFound) {
                throw new Error('User not found');
            }
            const deletedUser = await db.Users.destroy({ where: { id } })
            return {deletedUser,userFound};
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserService
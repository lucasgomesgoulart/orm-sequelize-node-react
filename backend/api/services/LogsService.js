const db = require('../models')

class UserService {
    static async createLog(){
        try {
            const newLog = await db.Logs
        } catch (error) {
            throw error;
        }
    }
}
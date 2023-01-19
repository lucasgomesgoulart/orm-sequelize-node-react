import api from '../api'
const jwt = require('jsonwebtoken');


const adminId = async (req, res)=>{
    await api.get('/admins')
}
    const secretKey = 'yoursecretkey';

function generateToken(user) {
    const payload = {
        userId: user.id,
    };

    // Gerar token com validade de 1 dia
    return jwt.sign(payload, secretKey, { expiresIn: '1d' });
}

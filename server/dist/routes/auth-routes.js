import { Router } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        // Validate input
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }
        // Find user by username
        const user = await User.findOne({
            where: { username },
        });
        if (!user || !user.password) {
            return res.status(401).json({ message: 'Authentication failed' });
        }
        // Compare hashed passwords
        const passwordIsValid = await bcrypt.compare(password, user.password);
        if (!passwordIsValid) {
            return res.status(401).json({ message: 'Authentication failed' });
        }
        const secretKey = process.env.JWT_SECRET_KEY;
        if (!secretKey) {
            return res.status(500).json({ message: 'JWT secret key is missing' });
        }
        // Create JWT token
        const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '1h' });
        return res.json({ token });
    }
    catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
const router = Router();
router.post('/login', login);
export default router;

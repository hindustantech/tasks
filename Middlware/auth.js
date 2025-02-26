import jwt from 'jsonwebtoken';
import User from '../Modal/User.js';

export const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']; // get from  header

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        const token = authHeader.split(' ')[1]; // Extract token after "Bearer"


        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }
        
        const secret = process.env.JWT_SERECT; //get from env
        const decoded = jwt.verify(token, secret); // Verify token
        
        const user = await User.findById(decoded._id).select('-password'); //get user Without  password
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: User not found' });
        }

        req.user = user; // Attach user data to request
        next(); // Proceed to the next middleware or route handler

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }

}


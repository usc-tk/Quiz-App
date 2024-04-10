import express from 'express'
import User from '../model/UserModel.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';


const router = express.Router();

router.post('/me', async (req, res) => {
        try {
                const token = req.body.token;
                if (!token) return res.status(401).send('Acess denied. No token provided.');

                const decode = jwt.verify(token, process.env.JWT_CODE);

                if (!decode) return res.status(401).send('Acess denied. No token provided.');

                const user = await User.findById(decode.id).select(['-password', "-_id", "-__v"]);
                res.send(user);
        } catch (e) {
                console.log(e);
        }

})

export default router;
import express from 'express'
import User from '../model/UserModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const router = express.Router();

router.post("/login", async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (validPassword) {
                const token = jwt.sign({
                    id: user._id,

                }, process.env.JWT_CODE);

                res.send(
                    {
                        token: token
                    });

            } else {
                return res.send({ message: "Log In credentials invalid" });
            }

        } else {
            res.send({ message: "Log In credential invalid" });
        }
    } catch (e) {
        res.send({ message: e });
    }
})

router.post("/createUser", async (req, res) => {
    try {
      const existingUser = await User.findOne({ email: req.body.email });
  
      if (existingUser) {
        // Email already exists, send an error response
        return res.send({ message: "Email already in use" });
      }
  
      let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
  
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      user = await user.save();
  
      const token = jwt.sign(
        {
          id: user._id
        },
        process.env.JWT_CODE
      );
  
      res.send({
        token: token
      });
    } catch (e) {
      console.log(e);
      res.send({ message: "Error on creating User" });
    }
  });
  

export default router;
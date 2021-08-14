import express from 'express';
import User from '../models/auth'; 
import jwt from 'jsonwebtoken';
import { secretKey } from '../config/config';

class AuthController {

  async login(req: express.Request, res: express.Response) {
    try {
      const { username, password } = req.body; 
      const user = await User.findOne({username});
      if (!user) {
        return res.status(400).json({message: `User ${username} has not found`});
      }
      const isPasswordValid = password === user.password;
      if (!isPasswordValid) {
        return res.status(400).json({message: `Password is incorrect`});
      }
      const token = jwt.sign({id: user.id}, secretKey, {expiresIn: '10h'});
      return res.json({
        token,
        user: {
          id: user.id,
          name: user.username
        }
      })

    } catch (err) {
      console.log(err);
      res.status(400).json({message: 'Login error'});
    }
  }

  async getUserById(req: express.Request, res: express.Response) {
    try {
      console.log(req.params);
      const user = await User.findById(req.params.id);
      return res.json({
        username: user.username,
        id: user.id
      });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }
}

export default new AuthController();
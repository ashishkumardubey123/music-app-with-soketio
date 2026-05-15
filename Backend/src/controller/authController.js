import express from 'express';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import db from "../config/dbconfig.js";
import usermodel from "../model/usermodel.js"


export const userregister = async (req, res) => {

      const { username, email, password } = req.body;

      if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
      }

      const isuser = await usermodel.findOne({ email })
      if (isuser) {
            return res.status(400).json({ message: "user already exists" })
      }

      const hashpassword = await bcrypt.hash(password, 10)

      const user = await usermodel.create({
            username,
            email,
            password: hashpassword,
      })

      const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET, { expiresIn: "1d" })

      res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            maxAge: 24 * 60 * 60 * 1000
      });

      return res.status(201).json({
            message: "user registered successfully",
            username,
            email,
            token
      })


}


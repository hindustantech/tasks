import { model } from "mongoose";
import User from "../Modal/User.js";
import jwt from 'jsonwebtoken'

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await User.findOne({ email });

        if (user) {
            res.status(400).json({
                success: false,
                message: 'User Exist'
            })
        }

        await User.create({
            name,
            email,
            password
        })


        res.status(201).json({
            success: true,
            message: 'User Register'
        })
    } catch (error) {
        console.log("Error Message", error.message);
        res.status(500).json({
            success: false,
            message: 'internal server error'
        })
    }

}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const u = await User.findOne({ email })

        if (!u) {
            res.status(400).json({
                success: false,
                message: "Email and Password  Should be Correct"
            })
        }

        if (!u.email == email && u.password == password) {
            res.status(400).json({
                success: false,
                message: 'Email and Password  Should be Correct'
            })
        }

        const secret = process.env.JWT_SERECT
        const accessToken = jwt.sign(
            { _id: u._id, email: u.email }, // Correct key-value structure
            secret
        );


        res.status(200).json({
            success: true,
            accessToken,
            message: "Login Successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "something went wrong"
        })
    }


}

export const getuser = async (req, res) => {
    const user = await User.find();

    if (!user) {
        res.status(404).json({
            success: false,
            message: "Not found "

        })
    }

    res.status(200).json({
        success: true,
        user,
    })

}


export const profile = async (req, res) => {
    try {

        const id = req.user.id;
        const user = await User.findById(id)
        if (!user) {
            res.status(404).json({
                success: false,
                message: "user Not Found"
            })

        }
        res.status(200).json({
            success: true,
            email: user.email,
            name: user.name
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong'
        })
    }

}


export default model 

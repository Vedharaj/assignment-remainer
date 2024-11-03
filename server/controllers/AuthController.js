import jwt from "jsonwebtoken";
import Staff from "../models/staffModel.js";
import { compare } from "bcrypt";
import Studend from '../models/studentModel.js'

const maxAge = 3 * 24 * 60 * 60 * 1000

const createToken = (email, userId) =>{
    return jwt.sign({email, userId}, process.env.JWT_KEY, {expiresIn: maxAge})
}

export const StuentSignup = async (request, response, next)=>{
    try {
        const {email, password, username} = request.body;
        if(!email && !password && !username){
            return response.status(400).send("Email Password and username is required")
        }
        const user = await Studend.create({email, password, username});
        response.cookie("jwt", createToken(email, user.id), {
            maxAge,
            secure: true,
            sameSite: "None",
        })
        return response.status(201).json({user:{
            id: user.id,
            email: user.email,
            username: user.username
        }})
    } catch (error) {
        console.log(error);
        return response.status(400).send("Internal Server Error")
    }
}

export const studentLogin = async (request, response, next)=>{
    try {
    const {email, password} = request.body;
        if(!email && !password){
            return response.status(400).send("Email and Password is required")
        } 
        
        const user = await Studend.findOne({email});
        if(!user){
            return response.status(404).send("User not found")
        }
        
        const auth = await compare(password, user.password)
        if(!auth){
            return response.status(400).send("Password is incorrect")
        }

        response.cookie("jwt", createToken(email, user.id), {
            maxAge,
            secure: true,
            sameSite: "None",
        })
        return response.status(200).json({user:{
            id: user.id,
            email: user.email,
            username: user.username
        }})
    } catch (error) {
        console.log(error);
        return response.status(400).send("Internal Server Error")
    }
}
export const StaffSignup = async (request, response, next)=>{
    try {
        const {email, password, username} = request.body;
        if(!email && !password && !username){
            return response.status(400).send("Email Password and username is required")
        }
        const user = await Staff.create({email, password, username});
        response.cookie("jwt", createToken(email, user.id), {
            maxAge,
            secure: true,
            sameSite: "None",
        })
        return response.status(201).json({user:{
            id: user.id,
            email: user.email,
            username: user.username
        }})
    } catch (error) {
        console.log(error);
        return response.status(400).send("Internal Server Error")
    }
}

export const StaffLogin = async (request, response, next)=>{
    try {
    const {email, password} = request.body;
        if(!email && !password){
            return response.status(400).send("Email and Password is required")
        } 
        
        const user = await Staff.findOne({email});
        if(!user){
            return response.status(404).send("User not found")
        }
        
        const auth = await compare(password, user.password)
        if(!auth){
            return response.status(400).send("Password is incorrect")
        }

        response.cookie("jwt", createToken(email, user.id), {
            maxAge,
            secure: true,
            sameSite: "None",
        })
        return response.status(200).json({user:{
            id: user.id,
            email: user.email,
            username: user.username
        }})
    } catch (error) {
        console.log(error);
        return response.status(400).send("Internal Server Error")
    }
}

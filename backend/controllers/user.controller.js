import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cldnry.js";


//for signup
export const register = async (req,res)=>{
    try {
        const {fullname, email, phoneNumber, password, role} = req.body;
        if(!fullname || !email || !phoneNumber || !password || !role){
            return res.status(400).json({
                message:"Something is messing",
                success:false,
            })
        };
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                message:"User already exist",
                success:false
            })
        }
        const hashedPassword = await bcrypt.hash(password,10);
        await User.create({
            fullname,
            email,
            phoneNumber,
            password:hashedPassword,
            role,
        });
        return res.status(201).json({
            message:"Account created",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

//for login
export const login = async (req,res)=>{
    try {
        const { email, password, role} = req.body;
        if(!email || !password || !role){
            return res.status(400).json({
                message:"Something is missing",
                success:false,
            })
        };
        let user = await User.findOne({email}); // use let so that user can update it
        if(!user){
            return res.status(400).json({
                message:"User or password is rong",
                success:false
            })
        }
        const ispasswordmached = await bcrypt.compare(password, user.password);
        if(!ispasswordmached){
            return res.status(400).json({
                message:"User or password is rong",
                success:false
            })
        };
        if(role != user.role){
            return res.status(400).json({
                message:"User not exist with this role",
                success:false
            })
        };
        const tokenData = {
            userId:user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {expiresIn:'1d'});

        user={
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile,
        }

        return res.status(200).cookie("token", token, {maxAge:1*24*60*60*1000, httpsOnly:true, sameSite:'strict'}).json({
            message:`Welcome Back ${user.fullname}`,
            user,
            success:true,
        })
    } catch (error) {
        console.log(error);
    }
}

export const logout = async(req,res)=>{
    try {
     return res.status(200).cookie("token", "", {maxAge:0}).json({
        message:"Logout Successfully",
        success:true,
     })
    } catch (error) {
        console.log(error);
    }
}

export const updateProfile = async (req,res)=>{
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        //if(!fullname || !email || !phoneNumber || !bio || !skills){ may bee user don't want to update all details
        //    return res.status(400).json({
        //        message:"Something is missing",
        //        success:false,
        //    });
        //};

        //cloudinery comes here

        let skillsArray;
        if(skills){
            skillsArray = skills.split(",");
        }
        const userId = req.id;
        let user = await User.findById(userId);
        if(!user){
            return res.status(400).json({
                message:"User not found",
                success:false
            });
        };

        if(fullname) user.fullname = fullname
        if(email) user.email = email
        //if(password) user.password = await bcrypt.hash(password,10);
        if(phoneNumber) user.phoneNumber = phoneNumber
        if(bio) user.profile.bio = bio
        if(skills) user.profile.skills = skillsArray

        if(cloudResponse){
            user.profile.resume = cloudResponse.secure_url // save the cloudinary url
            user.profile.resumeOriginalName = file.originalname // Save the original file name
        }

        await user.save();
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }
        return res.status(200).json({
            message:"Profile updated successfully",
            user,
            success:true
        });
    } catch (error) { 
        console.log(error);
    }
}
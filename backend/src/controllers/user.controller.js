import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import {z} from "zod"


const registerSchema=z.object({
    username: z.string(),
    email: z.string(),
    password: z.string()
})


const registerUser=asyncHandler(async(req,res)=>
{
    console.log(req.body);
    const parsed= registerSchema.safeParse(req.body);

    console.log(parsed)
    if(!parsed.success) throw new ApiError(400,"User fields are invalid;");

    const {username,email, password}=parsed.data;


    const findUser=await User.findOne({
        email:email
    });


    console.log("fndUser::",findUser);

    if(findUser)
        {
            console.log("next error");
            throw new ApiError(401,"user with this email already exists");

        } 



    const user=await User.create({
        username,
        email,
        password
    });

    console.log("user created::",user);

    res.status(200).json(
        new ApiResponse(200,user,"User registered")
    );
})

const generateAccessAndRefreshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}


const userLogin=asyncHandler(async(req,res)=>
{
    const {email,password}=req.body;

    if(!(email.trim() && password.trim())) throw new ApiError(400,"all fields are required");

    const user= await User.findOne({
        email:email
        });

    
        if(!user) throw new ApiError(404,"user not found")

    const isPasswordValid=await user.isPasswordCorrect(password);

    if(!isPasswordValid) throw new ApiError(401,"wrong password");

    const {accessToken,refreshToken}=await generateAccessAndRefreshTokens(user._id);

     const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged In Successfully"
        )
    )


})


const resetPassword=asyncHandler(async(req,res)=>
{
    const {newPassword,oldPassword}=req.body;

    if(!(newPassword || oldPassword)) throw new ApiError(400,"new password is required");

    const user=await User.findById(req.user_id);


    const isPasswordCorrect=await user.isPasswordCorrect(oldPassword);

    if(!isPasswordCorrect) throw new ApiError(409,"wrong password");

    user.password=newPassword;
    await user.save();

    user.status(200).json(
        new ApiResponse(200,user,"password changed successfully")
    )

});


export {
    registerUser,
    userLogin,
    resetPassword
    
}
import { compare, hash } from "bcrypt";
import crypto from "node:crypto"
import userModel from "../model/user.model.js";
import { BaseException } from "../exception/base.exception.js";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_EXPIRE_TIME, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_EXPIRE_TIME, REFRESH_TOKEN_SECRET } from "../config/jwt.config.js";
import { sendMail } from "../utils/mail.utils.js";

const getAllUsers = async (_, res) => {
    const users = await userModel.find();
    res.send({
        message: "success",
        data: users,
    });
};


const register = async (req,res,next) => {
    try {
        const {name,email,password} = req.body;

    const foundedUser = await userModel.findOne({email});

    if(foundedUser){
        res.render("register",{error:"This user is already exists!"})
    };

    const passwordHash = await hash(password, 10);

    const result = await userModel.create({
        name,
        email,
        password:passwordHash,
    });

    const givenToken = jwt.sign(
        {id: result.id,role: result.role},
        ACCESS_TOKEN_SECRET,
        {
            expiresIn:ACCESS_TOKEN_EXPIRE_TIME,
            algorithm:"HS256"
        }
    );

    const refreshToken = jwt.sign(
        {id: result.id,role: result.role},
        REFRESH_TOKEN_SECRET,
        {
            expiresIn:REFRESH_TOKEN_EXPIRE_TIME,
            algorithm:"HS256"
        }
    )

    await sendMail({
        to: email,
        subject:"Welcome",
        text:`Hello ${name}. We are happy to have you in out community . Hope you have best experience with our app!`
    })

    res.cookie("accessToken", givenToken, {
        maxAge: 60 * 1000,
        httpOnly: true,
      });
  
      res.cookie("refreshToken", refreshToken, {
        maxAge: 2 * 60 * 1000,
        httpOnly: true,
      });

      res.render("profile",{data:result})

    // console.log("success");

    // res.status(201).send({
    //     message:"success",
    //     data: result,
    //     tokens: {
    //         givenToken,
    //         refreshToken
    //     }
    // })
    } catch (error) {
       next(error) 
    }
};

const login = async (req,res,next) => {
    try {
        const {email,password} = req.body;
        const foundedUser = await userModel.findOne({email});
    
        if (!foundedUser){
            res.render("login",{error:"User with this email not found!"})
        }
    
        const isMatch = await compare(password, foundedUser.password);
    
        if(!isMatch){
            res.render("login",{error:"Invalid password!"})
        };

        const givenToken = jwt.sign(
            {id: foundedUser.id,role: foundedUser.role},
            ACCESS_TOKEN_SECRET,
            {
                expiresIn:ACCESS_TOKEN_EXPIRE_TIME,
                algorithm:"HS256"
            }
        );
    
        const refreshToken = jwt.sign(
            {id: foundedUser.id,role: foundedUser.role},
            REFRESH_TOKEN_SECRET,
            {
                expiresIn:REFRESH_TOKEN_EXPIRE_TIME,
                algorithm:"HS256"
            }
        )

        
    res.cookie("accessToken", givenToken, {
        maxAge: 60 * 1000,
        httpOnly: true,
      });
  
      res.cookie("refreshToken", refreshToken, {
        maxAge: 2 * 60 * 1000,
        httpOnly: true,
      });

      return res.render("profile",{data:foundedUser})

  
    
        // res.send({
        //     message:"success",
        //     data: foundedUser,
        //     tokens: {
        //         givenToken,
        //         refreshToken
        //     }
        // })
    } catch (error) {
        next(error)
    }
}

const updateUser = async (req, res,next) => {
    try {
        const id = req.params.id;
        const { name, email, imageUrl, jobId } = req.body;
        const user = await userModel.findByIdAndUpdate(
            id,
            { name, email, imageUrl, jobId },
            { new: true }
        );
        if (!user) {
            throw new BaseException("User not found",404);
        }
        res.send({
            message: "success",
            data: user,
        });
    } catch (error) {
        next(error)
    }
};

const deleteUser = async (req, res,next) => {
    try {
        const id = req.params.id;
        const user = await userModel.findByIdAndDelete(id);
        if (!user) {
            throw new BaseException("User not found",404);
        }
        // res.send({
        //     message: "success",
        //     data: user,
        // });
        res.redirect("/users/login")
    } catch (error) {
        next(error)
    }
};


const forgotPassword = async (req, res, next) => {
    try {
      const { email } = req.body;
  
      const user = await userModel.findOne({ email });
  
      if (!user) {
        return res.render("forgot-password", {
          error: "User not found",
          message: null,
        });
      }
  
      const server_base_url = "http://localhost:4000";
  
      const token = crypto.randomBytes(50);
      user.token = token.toString("hex");
  
      await user.save();
  
      await sendMail({
        to: email,
        subject: "Reset password",
        html: `
        <h2>Quyidagi link orqali yangilang muhiddin</h2>
        <a href="${server_base_url}/users/reset-password?token=${user.token}">Link</a>
        `,
      });
  
      res.render("forgot-password", {
        message: "Emailingizga link yuborildi!",
        error: null,
      });
    } catch (error) {
      next(error);
    }
  };
  
  const resetPassword = async (req, res, next) => {
    try {
      const { password } = req.body;
      const { token } = req.query;
      console.log(token);
  
      if (!token) {
        return res.redirect("/users/login");
      }
  
      const user = await userModel.findOne({ token });
  
      if (!user) {
        return res.redirect("/users/forgot-password");
      }
  
      const passwordHash = await hash(password, 10);
  
      user.password = passwordHash;
  
      await user.save();
  
      res.render("reset-password", {
        message: "Password yangilandi",
        error: null,
        token: null,
      });
    } catch (error) {
      next(error);
    }
  };

export default { getAllUsers, login , register, updateUser, deleteUser,resetPassword,forgotPassword };
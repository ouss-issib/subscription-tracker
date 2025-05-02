import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";
import User from "../models/user.model.js";

export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        //Try to insert a new user
        const { name, email, password } = req.body;

        //check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const error = new Error("User already exists");
            error.statusCode = 422;
            throw error;
        }

        //if user does not exist, create a new user
        //hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        //create a new user
        const newUsers = await User.create([{ name, email, password: hashedPassword }], { session });

        const token = jwt.sign({ userId: newUsers[0]._id.toString() }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        //commit the transaction
        await session.commitTransaction();
        session.endSession();

        //send the response
        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: {
                user: newUsers[0],
                token,
                expiresIn: JWT_EXPIRES_IN
            },
        });
    }
    catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}

export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        //check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            const error = new Error("User not found ");
            error.statusCode = 404;
            throw error;
        }
        //check if password is correct
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            const error = new Error("Incorrect password");
            error.statusCode = 401;
            throw error;
        }

        //create a token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        //send the response
        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: {
                user,
                token,
            },
        });
    }
    catch (error) {
        next(error);

    }
}

export const signOut = async (req, res, next) => { }


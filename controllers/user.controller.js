import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: {
                users,
            },
        });
    } catch (error) {
        next(error);
    }
}
export const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select("-password"); // -password excludes the password field from the response
        //check if user exists
        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: {
                user,
            },
        });
    } catch (error) {
        next(error);
    }
}

export const createUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        //check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const error = new Error("User already exists");
            error.statusCode = 409; // Conflict
            throw error;
        }

        //crypt password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //Create a new User
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        res.status(201).json({
            success: true,
            message: "User created",
            data: {
                user,
            },
        })

    }
    catch (error) {
        next(error);
    }
}


export const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, req.body, { new: true }); // new: true returns the updated document   
        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            success: true,
            message: "User updated",
            data: {
                user,
            },
        });
    } catch (error) {
        next(error);
    }
}


export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params
        const existingUser = await User.findOne({ _id: id });
        if (!existingUser) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }
        await User.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "User deleted",
            data: {
                user: existingUser,
            },
        });
    }
    catch (error) {
        next(error);
    }
}
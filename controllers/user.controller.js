import User from "../models/user.model";

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

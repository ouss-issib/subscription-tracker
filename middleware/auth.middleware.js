import { JWT_SECRET } from "../config/env.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
export const authorize = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]; // get the token from the cookie or the authorization header

    if (!token)
        return res.status(401).json({ message: "Not authorized, no token" }); // if no token, return 401
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.userId); // find the user by ia
        req.user = user; // add the user to the request object
        next();
    } catch (error) {
        const err = new Error("Not authorized, token failed");
        err.statusCode = 401;
        next(err);
    }
}
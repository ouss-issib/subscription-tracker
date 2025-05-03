import { Router } from "express";
import { getAllUsers, getUserById, createUser, deleteUser, updateUser } from "../controllers/user.controller.js";
import { authorize } from "../middleware/auth.middleware.js";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", authorize, getUserById);
userRouter.post("/", createUser);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);

export default userRouter;


// mongodb + srv://ouss:ouss@cluster0.ztmpgxv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// #PORT
// PORT = 5500

// #MODE
// NODE_ENV = "development"

// #Database
// DB_URI = "mongodb+srv://ouss:ouss@cluster0.ztmpgxv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"



// #JWT AUTH
// JWT_SECRET = "ouss"
// JWT_EXPIRES_IN = "1d"
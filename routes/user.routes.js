import { Router } from "express";
import { getAllUsers, getUserById } from "../controllers/user.controller";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserById);
userRouter.post("/", (req, res) => res.send({ title: "CREATE new user" }));
userRouter.put("/:id", (req, res) => res.send({ title: "UPDATE a user" }));
userRouter.delete("/:id", (req, res) => res.send({ title: "DELETE a user" }));

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
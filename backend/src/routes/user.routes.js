import express from "express"
import { testController } from "../controllers/user.controller.js"
import { registerUser } from "../controllers/user.controller.js"
import { loginUser,logoutUser } from "../controllers/user.controller.js"
import { getUsers,getUserCount } from "../controllers/user.controller.js"
import { refreshAccessToken } from "../controllers/user.controller.js"
import { createUser,updateUser,deleteUser } from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = express.Router()

// Define routes
router.route("/test").get(testController)
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/users").get(getUsers)
router.route("/usercount").get(getUserCount)
router.route("/user/:userId").put(updateUser)
router.route("/user/:userId").delete(deleteUser)
router.route("/createuser").post(createUser)

export default router

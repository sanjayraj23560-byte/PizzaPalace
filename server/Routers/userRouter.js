import express from "express";
import userModel from '../Models/user.js'
const router = express.Router();

router.post("/ret", async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log("hey there", username)
        const newData = userModel.model({
            username: username,
            password: password
        })
        const datasave = userModel.save(newData)

    } catch (error) {
        return res.status(400).json({ message: "Invalid credentials" });
        console.log(error)
    }

});

export default router;  
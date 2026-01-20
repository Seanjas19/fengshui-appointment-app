const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


const register = async (req, res) => {
    try {
        const {username, user_email, user_password, user_contact} = req.body;

        const existUser = await db.query("SELECT * FROM users WHERE user_email = $1", [user_email]);

        if (existUser.rows.length !== 0) {
            return res.status(401).send("User already existed!");
        }

        const numSalt = 10;

        const salt = await bcrypt.genSalt(numSalt);

        const bcrypt_password = await bcrypt.hash(user_password, salt);

        const newUser = await db.query(
            "INSERT INTO users( username, user_email, user_password, user_contact ) VALUES ($1, $2, $3, $4) RETURNING *",
            [username, user_email, bcrypt_password, user_contact]
        );

        res.status(201).json({
            message: "Sign Up Successful!",
            user_id: newUser.rows[0].user_id
        });
    } 
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}

const login = async (req, res) => {
    try {
        const {user_email, user_password} = req.body;

        const checkUser = await db.query("SELECT * FROM users WHERE user_email = $1", [user_email]);

        if (checkUser.rows.length === 0) {
            return res.status(401).send("Account does not exist!");
        }

        const valid_password = await bcrypt.compare(
            user_password,
            checkUser.rows[0].user_password        
        )

        if (!valid_password){
            return res.status(401).json({message: "Invalid Email or Password"});
        }

        const token = jwt.sign(
            {id: checkUser.rows[0].user_id},
            process.env.JWT_SECRET,
            {expiresIn: "5h"}
        )

        res.status(200).json({
            message: "Login Successful!",
            token: token,
            user: {
                id: checkUser.rows[0].user_id,
                name: checkUser.rows[0].username
            }
        })

    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}

module.exports = {
    register, 
    login
}
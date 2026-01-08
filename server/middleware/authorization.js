const jwt = require("jsonwebtoken");
require("dotenv").config();

//Authorization function act as a Bounder
module.exports = async (req, res, next) => {

    const authHeader = req.header("Authorization");
    console.log("DEBUG 1 : Authorization Header Received!:", authHeader);
        
    if (!authHeader) {
        console.log("DEBUG 2 : Access Denied - No Header Provided!")
        return res.status(401).json({message: "No Token Provided!"});
    }

    const token = authHeader.split(" ")[1];
    console.log("DEBUG 3 : Extracted Token:", token ? "Token Exist!" : "Token is null!");


    try{

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("DEBUG 4 : Token Decoded Successfully!", decoded);
        req.user = decoded.id;
        
        next();
    }
    catch (err) {
        console.error(err.message);
        return res.status(403).json({message: "Token is invalid!"});
    }
}
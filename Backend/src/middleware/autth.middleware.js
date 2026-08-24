import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function authUser(req, res, next) {
    const token = req.session.token ;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorised",
            success: false,
            err: "No token provided. "
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
       
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({
            message: "Unauthorised",
            success: false,
            err: "Invalid or expired token."
        });
    }
}

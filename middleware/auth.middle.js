import jwt from "jsonwebtoken";
// remove without using it
import userModel from "../model/user.model.js";

export const authentication = async(req, res, next) => {

    const headerToken = req.headers["Authentication"]; // <== Authorization
    const token =
        headerToken.split(" ")[0] === "Bearer" ?
        headerToken.split(" ")[1] :
        headerToken.split(" ")[0];

    const headerRefreshToken = req.headers["Authentication-refreshToken"]; // <== It not works with "RefreshToken"
    const refreshToken =
        headerToken.split(" ")[0] === "Bearer" ?
        headerToken.split(" ")[1] :
        headerRefreshToken.split(" ")[0];

    const authenToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const authenRefreshToken = jwt.verify(
        refreshToken,
        process.env.SECRET_REFRESH_TOKEN
    );
    if (!authenToken && !authenRefreshToken)
        throw new Error("All Tokens Expires. Login again!"); // <== Throw error without handling it
    if (!authenToken && authenRefreshToken) {
        // 
        const token = jwt.sign(req.user, process.env.SECRET_TOKEN, {
            expiresIn: "5m",
        });
        const refreshToken = jwt.sign(req.user, process.env.SECRET_REFRESH_TOKEN, {
            expiresIn: "1d",
        });
        const authen = { token, refreshToken }; // <== where is the user?
        req.user = authen;
    }
    next();
};


export const author = (req, res, next) => {
    const user = req.user;
    if (!user.role.includes("admin")) throw new Error("Cannot access");
    next();
};
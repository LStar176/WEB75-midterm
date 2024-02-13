import jwt from "jsonwebtoken";
import userModel from "../model/user.model.js";



// Request: Url + Headers + Body + Params + Query

// URL -> route (public, protected(region protected, team protected, admin protected))
export const authentication = async(req, res, next) => {
    try {
        const headerToken = req.headers["authorization"];
        // Validation token
        if (!headerToken)
            throw {
                status: 401,
                message: "You need to login to access!",
            };
        // verify tokens
        const token =
            headerToken.split(" ")[0] === "Bearer" ?
            headerToken.split(" ")[1] :
            headerToken.split(" ")[0];
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN);

        // Add payload to req.user
        req.user = await userModel.findOne({ _id: decoded.id }).select("-password"); // save user to req.user for authorization
        next();
    } catch (error) {
        console.error("Error in authentication middleware:", error);
        res
            .status(error.status || 500)
            .send(error.message || "Internal server error");
    }
};

export const author = (req, res, next) => {
    // [role] ? -> admin, user
    try {
        // token => [system] => user (security)
        // [user-input] => req.headers['username']

        const user = req.user;
        const role = user.role;
        //

        // 

        next();
    } catch (error) {
        res
            .status(error.status || 500)
            .send(error.message || "Internal server error");
    }
};
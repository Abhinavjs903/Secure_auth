const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

    const token = req.headers.authorization;

    if (!token) {

        return res.status(401).json({

            success: false,

            message: "Access Denied"

        });

    }

    try {

        const verified = jwt.verify(token, process.env.JWT_SECRET);

        req.user = verified;

        next();

    } catch (error) {

        return res.status(401).json({

            success: false,

            message: "Invalid Token"

        });

    }

};

module.exports = authMiddleware;
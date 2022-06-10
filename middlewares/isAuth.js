const jwt = require('jsonwebtoken');
const User = require("../models/UserSchema");

const isAuth = async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        console.log('未登入');
    }

    const decoded = await new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
            if (err) {
                reject(err);
            } else {
                resolve(payload);
            }
        })
    })

    // const currentUser = await User.findById(descoded.id);
    // req.user = currentUser;

    req.user = {
        id: decoded.id,
        name: 'mick',
    };
    next();
}

module.exports = isAuth;
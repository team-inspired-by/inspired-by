import jwt from "jsonwebtoken";
import {
    v4
} from "uuid";
import {
    AuthenticationError
} from "apollo-server-express";
// const uuidv4 = require("uuid").v4;

export const generateRefreshToken = function (db, userId, userAlias, userLevel) {
    const refreshId = v4();
    const accessToken = jwt.sign({
            alias: userAlias,
            level: userLevel
            // email: userEmail
        },
        process.env.NODE_JWT_KEY, {
            expiresIn: "5m",
        }
    );
    const refreshToken = jwt.sign({
        id: refreshId
    }, process.env.NODE_JWT_KEY, {
        expiresIn: "7d",
    });

    const date = new Date();
    date.setDate(date.getDate() + 7);

    db.RefreshToken.create({
        id: refreshId,
        token: refreshToken,
        userAlias: userAlias,
        expiredIn: date,
        issuedAccessToken: accessToken
    }).then(res => {
        console.log("successfully issued refreshToken: ", res.dataValues)
    }).catch(err => {
        console.error("error on issuing refreshToken: ", err)
    });

    return {
        accessToken,
        refreshToken
    }
};

export const issueAccessToken = async function (db, _refreshToken, _accessToken, response) {
    let refreshToken;
    try {
        refreshToken = jwt.verify(_refreshToken, process.env.NODE_JWT_KEY);
    } catch (err) {
        console.error("error occurred on verifying refreshToken when decoding on issueAccessToken(): ", err);
        throw new AuthenticationError(err, {
            'code': 'WRONG_TOKEN'
        });
    }
    const accessToken = jwt.decode(_accessToken, process.env.NODE_JWT_KEY);


    console.log("accessToken on issueAccessToken(): ", accessToken)

    const refreshTokenInfo = await db.RefreshToken.findOne({
        logging: console.log,
        attributes: ["id", "userAlias"],
        where: {
            id: refreshToken.id
        }
    })

    console.log("id on refreshTokenInfo: ", refreshTokenInfo.dataValues.id)

    if (refreshTokenInfo.userAlias === accessToken.alias) {
        const newAccessToken = jwt.sign({
                alias: accessToken.alias,
                level: accessToken.level
            },
            process.env.NODE_JWT_KEY, {
                expiresIn: "5m",
            }
        );
        let newRefreshToken;
        console.log("newAccessToken on issueAccessToken(): ", newAccessToken)
        const accessDate = new Date();
        accessDate.setMinutes(accessDate.getMinutes() + 5);


        // NOTE: issue new refreshToken together if expire date is within 2 days
        const expRefreshDate = new Date(refreshToken.exp);
        expRefreshDate.setDate(expRefreshDate.getDate() - 2);

        if (expRefreshDate < new Date()) {
            const refreshId = v4();
            newRefreshToken = jwt.sign({
                id: refreshId
            }, process.env.NODE_JWT_KEY, {
                expiresIn: "7d",
            });

            const refreshDate = new Date();
            refreshDate.setDate(refreshDate.getDate() + 7);

            await db.RefreshToken.create({
                id: refreshId,
                token: newRefreshToken,
                userAlias: accessToken.alias,
                expiredIn: refreshDate,
                issuedAccessToken: newAccessToken
            }).then(res => {
                console.log("successfully reissued refreshToken & accessToken: ", res.dataValues)
            }).catch(err => {
                console.error("error on issuing refreshToken: ", err)
                throw new AuthenticationError("error on issuing refreshToken", {
                    'code': 'INTERNAL_ERROR'
                })
            });
        } else {
            await db.RefreshToken.update({
                    issuedAccessToken: newAccessToken,
                }, {
                    where: {
                        id: refreshTokenInfo.id
                    }
                })
                .then(res => {
                    console.log("successfully reissued accessToken: ", res)
                })
                .catch(err => {
                    console.error("error occurred when adding issuedAccessToken to RefreshToken DB: ", err);
                    throw new AuthenticationError("error occurred when adding issuedAccessToken to RefreshToken DB", {
                        'code': 'INTERNAL_ERROR'
                    })
                });
        }
        return {
            auth: {
                alias: accessToken.alias,
                level: accessToken.level
            },
            tokens: {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken | null,
            },
            db
        }
    } else {
        throw new AuthenticationError("User's info mismatched.", {
            'code': 'MISMATCH_TOKEN'
        })
    }
};

export const setAuth = function (db, _accessToken) {
    console.log('on setAuth(): ', _accessToken);
    try {
        let accessToken = jwt.verify(_accessToken, process.env.NODE_JWT_KEY);
        console.log("accessToken: ", accessToken);
        return {
            auth: accessToken,
            db,
        };
    } catch (err) {
        console.error("error occurred when decoding on setAuth(): ", err.message);
        throw new AuthenticationError(err);
    }
}


// export const refresh = function (db, accessToken, refreshToken) {
//     const token = req.headers.authorization.substr(7);
//     try {
//         let decoded = jwt.verify(token, process.env.NODE_JWT_KEY);
//         console.log("decoded: ", decoded);
//         return {
//             user: undefined,
//             db,
//         };
//     } catch (err) {
//         console.log("error: ", err);
//         return {
//             user: undefined,
//             db,
//         };
//     }
// };

// export const signUp = function (userInfo) {
//     let accessToken = jwt.sign({
//             id: userInfo.id,
//         },
//         process.env.NODE_JWT_KEY, {
//             expiresIn: "1m",
//         }
//     );
//     let refreshToken = jwt.sign({
//             id: usaerInfo.id,
//         },
//         process.env.NODE_JWT_KEY, {
//             expiresIn: "7d",
//         }
//     );
//     console.log("on sign():", {
//         accessToken: accessToken,
//         refreshToken: refreshToken,
//     });
//     return {
//         accessToken: accessToken,
//         refreshToken: refreshToken,
//     };
// };
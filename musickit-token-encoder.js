"use strict";

const fs      = require("fs");
const jwt     = require("jsonwebtoken");

const privateKey = fs.readFileSync("AuthKey_5RCM3N2PR4.p8").toString();
const teamId     = "S9B39CUS42";
const keyId      = "5RCM3N2PR4";

const jwtToken = jwt.sign({}, privateKey, {
    algorithm: "ES256",
    expiresIn: "180d",
    issuer: teamId,
    header: {
        alg: "ES256",
        kid: keyId
    }
});

console.log(jwtToken);
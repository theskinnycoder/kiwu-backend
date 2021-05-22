import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./constants.js";

export const encodeJWT = payload => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, JWT_SECRET, { expiresIn: "364d" }, (err, token) => {
      if (err) return reject(err);
      else return resolve(token);
    });
  });
};

export const decodeJWT = token => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, payload) => {
      if (err) return reject(err);
      else return resolve(payload);
    });
  });
};

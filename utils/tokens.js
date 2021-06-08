import { sign, verify } from 'jsonwebtoken';
import { JWT_SECRET } from './constants';

export const encodeJWT = (payload) =>
  new Promise((resolve, reject) => {
    sign(payload, JWT_SECRET, { expiresIn: '364d' }, (err, token) => {
      if (err) return reject(err);
      return resolve(token);
    });
  });

export const decodeJWT = (token) =>
  new Promise((resolve, reject) => {
    verify(token, JWT_SECRET, (err, payload) => {
      if (err) return reject(err);
      return resolve(payload);
    });
  });

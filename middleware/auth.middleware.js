import asyncHandler from 'express-async-handler';
import { getProfileByID } from '../services/profile.services';
import { COOKIE_NAME, decodeJWT } from '../utils';

// -- Private Routes' Protection Midddleware
export const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies[COOKIE_NAME];
  if (token) {
    const decoded = await decodeJWT(token);

    if (decoded) req.user = await getProfileByID(decoded.id);
    else throw new Error('Unauthenticated! Please login again');
    next();
  } else {
    res.status(401);
    throw new Error('Unauthenticated! Please login again');
  }
});

// -- Admin-Only Routes' Protection Midddleware
export const isAdmin = asyncHandler((req, res, next) => {
  if (req.user.role === 'DESIGNER') {
    next();
  } else {
    res.status(401);
    throw new Error('Unauthorized as a Designer');
  }
});

// -- Super-Admin-Only Routes' Protection Midddleware
export const isSuperAdmin = asyncHandler((req, res, next) => {
  if (req.user.role === 'ADMIN') {
    next();
  } else {
    res.status(401);
    throw new Error('Unauthorized as an Admin');
  }
});

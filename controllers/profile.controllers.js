import asyncHandler from 'express-async-handler';
import { deleteProfileByID, getProfileByID, updateProfileByID } from '../services/profile.services';
import { COOKIE_NAME, encodeJWT, IS_PROD } from '../utils';

export const profileDetails = asyncHandler(async (req, res) => {
  const profile = await getProfileByID({ id: req?.user._id });

  if (profile) {
    res.json({ data: profile });
  } else {
    res.status(404);
    throw new Error('Profile not found');
  }
});

export const profilePut = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const { updatedProfile, prevPassword } = await updateProfileByID({
    id: req?.user._id,
    username,
    email,
    password,
  });

  const hasPasswordChanged = prevPassword !== password;

  if (updatedProfile) {
    if (hasPasswordChanged)
      res.cookie(COOKIE_NAME, await encodeJWT({ id: req?.user._id }), {
        httpOnly: true,
        sameSite: true,
        secure: IS_PROD,
        maxAge: 364 * 24 * 60 * 60 * 1000,
      });

    res.json({ data: updatedProfile });
  } else {
    res.status(404);
    throw new Error('Profile not found');
  }
});

export const profileDelete = asyncHandler(async (req, res) => {
  const deletedProfile = await deleteProfileByID({ id: req?.user.id });

  if (deletedProfile) {
    req.user = null;
    res.cookie(COOKIE_NAME, '', { maxAge: 0 }).json({ data: deletedProfile });
  } else {
    res.status(404);
    throw new Error('Profile not found');
  }
});

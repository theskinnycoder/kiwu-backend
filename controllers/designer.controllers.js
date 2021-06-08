import asyncHandler from 'express-async-handler';
import {
  deleteDesignerByID,
  getAllDesigners,
  getDesignerByID,
  makeAsDesignerByEmail,
  removeFromDesignersByEmail,
  removeFromDesignersByID,
  updateDesignerByID,
} from '../services/designer.services';
import { COOKIE_NAME } from '../utils';

export const designersIndex = asyncHandler(async (_req, res) => {
  const designers = await getAllDesigners();
  res.json({ data: designers });
});

export const designerDetails = asyncHandler(async (req, res) => {
  const designer = await getDesignerByID({ id: req.params.id });

  if (designer) {
    res.json({ data: designer });
  } else {
    res.status(404);
    throw new Error('There is no designer with this ID');
  }
});

export const designerPut = asyncHandler(async (req, res) => {
  const { username, email } = req.body;

  const updatedDesigner = await updateDesignerByID({
    id: req.params.id,
    username,
    email,
  });

  if (updatedDesigner) {
    res.json({ data: updatedDesigner });
  } else {
    res.status(404);
    throw new Error('There is no designer with this ID');
  }
});

export const designerPatch = asyncHandler(async (req, res) => {
  let updatedDesigner;
  if (req.body.email)
    updatedDesigner = await removeFromDesignersByEmail({
      email: req.body.email,
    });
  else updatedDesigner = await removeFromDesignersByID({ id: req.params.id });

  if (updatedDesigner) {
    res.json({ data: updatedDesigner });
  } else {
    res.status(404);
    throw new Error('There is no designer with this ID');
  }
});

export const designerDelete = asyncHandler(async (req, res) => {
  const deletedDesigner = await deleteDesignerByID({ id: req.params.id });

  if (deletedDesigner) {
    req.user = null;
    res.cookie(COOKIE_NAME, '', { maxAge: 0 }).json({ data: deletedDesigner.id });
  } else {
    res.status(404);
    throw new Error('There is no designer with this ID');
  }
});

export const makeDesigner = asyncHandler(async (req, res) => {
  const newDesigner = await makeAsDesignerByEmail({ email: req.body.email });

  if (newDesigner) res.json({ data: newDesigner });
  else {
    res.status(404);
    throw new Error("Couldn't make this customer as a designer");
  }
});

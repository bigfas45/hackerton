import express, { Request, Response, NextFunction } from 'express';
import {
  currentUser,
  BadRequestError,
  NotAuthorizedError,
} from '@vboxdev/common';
import { Image } from '../models/image';
import fs from 'fs';

const router = express.Router();

router.get(
  '/api/users/image/read/:imageId',
  currentUser,
  async (req: Request, res: Response, next: NextFunction) => {
    const { imageId } = req.params;
    const image = await Image.findById(imageId);

    if (!image) {
      throw new BadRequestError('Image does not exist');
    }


    // if (image.id != req.currentUser!.id) {
    //   throw new NotAuthorizedError();
    // }

    res.send(image);
  }
);

export { router as ImageReadRouter };

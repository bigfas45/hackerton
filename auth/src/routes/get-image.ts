import express, { Request, Response } from 'express';
import {
  currentUser,
  NotFoundError,
  NotAuthorizedError,
} from '@vboxdev/common';
import { Image } from '../models/image';

const router = express.Router();

router.get(
  '/api/users/image/:imageId',
  currentUser,
  async (req: Request, res: Response) => {
    const { userId } = req.params;

    const image = await Image.findById(userId);

    if (!image) {
      throw new NotFoundError();
    }

    if (image.id != req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    res.send(image);
  }
);

export { router as UserImageGetByIdRouter };

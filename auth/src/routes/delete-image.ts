import express, { Request, Response } from 'express';
import { currentUser, NotFoundError } from '@vboxdev/common';
import { Image } from '../models/image';

const router = express.Router();

router.delete(
  '/api/users/image/:imageId',

 async (req: Request, res: Response) => {
    
    const { imageId } = req.params;

   const user = await Image.findById(imageId);

   if (!user) {
    throw new NotFoundError();
   }


   user.remove();

   res.send({
     success: true,
     message: 'User deleted successful!',
     code: 201,
   });
  }
);

export { router as deleteUserImageRouter };

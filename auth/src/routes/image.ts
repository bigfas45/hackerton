import express, { Request, Response } from 'express';
import {
  requireAuth,
  requireAuthAdmin,
  BadRequestError,
  currentUser,
} from '@vboxdev/common';
import formidable from 'formidable';
import _ from 'lodash';
import fs from 'fs';
import { Image } from '../models/image';
const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: 'vbox-media',
  api_key: '777664511877551',
  api_secret: '0c8FsENNo7xS2lP_553ZrLuPW8c',
  secure: true,
});

const router = express.Router();

router.post(
  '/api/users/image/upload',
  currentUser,
  async (req: Request, res: Response) => {
    // get user model doc

    var linkss = '';

    let form = new formidable.IncomingForm();
    // @ts-ignore
    form.maxFileSize = 1000 * 1024 * 10024;
    // @ts-ignore
    form.keepExtensions = true;
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).json({ error: 'File could not be uploaded' });
      }
      // check for all fields
      const { user } = fields;

      if (!user) {
        return res.status(400).json({
          error: ' All fields are required ',
        });
      }

      // get category model doc

      let ImageUser = new Image(fields);
      if (files.file) {
        // console.log('FILES PHOTO', files.file);

        await cloudinary.v2.uploader.upload(
          // @ts-ignore
          files.file.path,
          {
            width: 260,
            height: 200,
            crop: 'crop',
            gravity: 'north',
            background: 'black',
          },
          // @ts-ignore
          function (error, result) {
            linkss = result.secure_url;

            return linkss;
          }
        );
      } else {
        return res.status(400).json({
          error: ' File fields are required ',
        });
      }

      console.log(linkss);
      ImageUser.link = linkss;

      ImageUser.save((err, result) => {
        if (err) {
          return res.status(400).json(err);
        }
        res.json(result);
      });
    });
  }
);

export { router as UserImageUploadRouter };

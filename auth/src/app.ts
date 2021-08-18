import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { errorHandler, NotFoundError } from '@vboxdev/common';
import { UserImageUploadRouter } from './routes/image';


var cors = require('cors');



import cookieSession from 'cookie-session';
const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(cors());
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);


app.use(UserImageUploadRouter);



app.all('*', async (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };

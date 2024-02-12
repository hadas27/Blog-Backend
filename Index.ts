import express, { Request, Response } from 'express';
import activityLogger from './middlewares/activityLogger';
import postsRoute from './routes/postsRoute';
import usersRoute from './routes/usersRoute';
import authRoute from './routes/authRoute';
import cors from 'cors';

export const app = express();
require('dotenv').config();

app.use(express.json());
app.use(activityLogger);
app.use(cors({ origin: 'http://localhost:3000' }))
const port = 5000;

app.use("/auth", authRoute);
app.use("/posts", postsRoute);
app.use("/users", usersRoute)

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

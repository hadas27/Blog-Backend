import express, { Request, Response } from 'express';
import activityLogger from './middlewares/activityLogger';
import InMemoryDB from './utils/InMemoryDB';
import postsRoute from './routes/postsRoute';

const app = express();
app.use(express.json());
app.use(activityLogger);
const port = 5000;
const db = InMemoryDB.getInstance();

app.use("/posts", postsRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


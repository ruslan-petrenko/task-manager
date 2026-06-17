import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth';
import tasksRouter from './routes/tasks';

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL ?? 'http://localhost:5173' }));
app.use(express.json());

app.use('/auth', authRouter);
app.use('/tasks', tasksRouter);

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});

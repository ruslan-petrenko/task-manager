import express from 'express';
import cors from 'cors';
import tasksRouter from './routes/tasks';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/tasks', tasksRouter);

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});

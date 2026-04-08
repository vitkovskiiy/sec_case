import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Work' });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
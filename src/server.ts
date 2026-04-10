import express, { Request, Response } from 'express';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Work' });
});


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
import express from 'express';
import 'dotenv/config';
import {subscribeRouter} from "./presentation/routes/subscribe.router"
import { tokenRouter } from './presentation/routes/token.router';


const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/subscribe", subscribeRouter)
app.use("/confirm", tokenRouter)

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
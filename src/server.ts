import express from 'express';
import 'dotenv/config';
import {subscribeRouter} from "./presentation/routes/subscribe.router"

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/subscribe", subscribeRouter)

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
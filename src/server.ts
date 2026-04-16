import express from "express";
import "dotenv/config";
import { subscribeRouter } from "./presentation/routes/subscribe.router";
import { tokenRouter } from "./presentation/routes/token.router";
import { unsubscribeRouter } from "./presentation/routes/unsubscribe.router";
import { findRouter } from "./presentation/routes/findSubscribe.router";
import { metricsRouter } from "./presentation/routes/metrics.router";
import {scannerService} from "./infrastructure/config/composition.root";

export const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/subscribe", subscribeRouter);
app.use("/confirm", tokenRouter);
app.use("/unsubscribe", unsubscribeRouter);
app.use("/subscriptions", findRouter);
app.use("/metrics", metricsRouter)

if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
    scannerService.checker()
  });
}

import { scannerService } from "../../index";
import cron from "node-cron";

async function runWorker() {
  console.log("🚀 Cron get up. Start loop...");

  try {
    const response = await scannerService.checker();
  } catch (error) {
    console.error(error);
  }
}

export function startScannerCron() {
  console.log("🕒 Scanner is running. Scanner waiting for timer...");
  cron.schedule("*/1 * * * *", async () => {
    console.log("Start scanner...");
    try {
      await runWorker();
    } catch (error) {
      console.error("Error while start cron:", error);
    }
  });
}
runWorker();

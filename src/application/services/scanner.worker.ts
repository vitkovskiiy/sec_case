import { scannerService } from "../..";
import { pool } from "../../infrastructure/database";
import { GitHubChecker } from "../../infrastructure/github.checker";
const checker = new GitHubChecker()
import cron from "node-cron";


async function runWorker() {
  console.log("🚀 Сканнер проснулся. Начинаем проверку репозиториев...");
  
  try {
    const response = await scannerService.checker()
    console.log(response)
  } catch (error) {
    console.error("❌ Критическая ошибка в работе сканнера:", error);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

export function startScannerCron() {
  console.log("🕒 Scanner is running. Scanner waiting for timer...");
  cron.schedule("0 * * * *", async () => {
    console.log("🚀 [CRON] Запуск автоматической проверки репозиториев...");
    try {
      await runWorker();
    } catch (error) {
      console.error("❌ Ошибка во время выполнения крона:", error);
    }
  });
}
runWorker();
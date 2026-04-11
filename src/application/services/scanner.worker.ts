import { scannerService } from "../..";
import { pool } from "../../infrastructure/database";
import { GitHubChecker } from "../../infrastructure/github.checker";
const checker = new GitHubChecker()


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
runWorker();
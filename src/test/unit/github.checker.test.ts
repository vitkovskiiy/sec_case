import { test, expect, vi } from "vitest";
import { GitHubChecker } from "../../infrastructure/github.checker";

test("возвращает true, если Гитхаб ответил 200", async () => {
  const checker = new GitHubChecker()
  const repo = "vitkovskiiy/Whitty"
  const result = await checker.check(repo)
  expect(result).toBe(true);
});

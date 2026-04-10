import { test, expect, vi } from "vitest";
import { GitHubChecker } from "../../infrastructure/github.checker";

test("возвращает true, если Гитхаб ответил 200", async () => {
  const result = await GitHubChecker.check("vitkovskiiy/Whitty");

  expect(result).toBe(true);
});

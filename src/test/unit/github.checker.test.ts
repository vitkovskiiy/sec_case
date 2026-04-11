import { test, expect, vi, afterEach } from "vitest";
import { GitHubChecker } from "../../infrastructure/github.checker";
afterEach(() => {
  vi.restoreAllMocks();
});

test("возвращает true, если Гитхаб ответил 200", async () => {
  const fetchSpy = vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({})
  }));

  const checker = new GitHubChecker();
  const repo = "vitkovskiiy/Whitty";

  const result = await checker.check(repo);
  expect(result).toBe(true);
  expect(fetchSpy).toHaveBeenCalledWith(expect.stringContaining(repo));
});
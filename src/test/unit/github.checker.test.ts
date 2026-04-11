import { test, expect, vi, afterEach } from "vitest";
import { GitHubChecker } from "../../infrastructure/github.checker";
afterEach(() => {
  vi.restoreAllMocks();
});

test("возвращает true, если Гитхаб ответил 200", async () => {
  const fetchMock = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({})
  });
  vi.stubGlobal('fetch', fetchMock);

  const checker = new GitHubChecker();
  const result = await checker.check("vitkovskiiy/Whitty");

  expect(result).toBe(true);
  expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining("vitkovskiiy/Whitty"));
});
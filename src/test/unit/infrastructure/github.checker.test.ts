import { test, expect, vi, afterEach } from "vitest";
import { GitHubChecker } from "../../../infrastructure/services/github.checker";
afterEach(() => {
  vi.restoreAllMocks();
});

test("returns true if GitHub responded 200", async () => {
  const fetchMock = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({}),
  });
  vi.stubGlobal("fetch", fetchMock);

  const checker = new GitHubChecker();
  const result = await checker.check("vitkovskiiy/Whitty");

  expect(result).toBe(true);
  expect(fetchMock).toHaveBeenCalledWith(
    expect.stringContaining("vitkovskiiy/Whitty"),
    expect.any(Object),
  );
});

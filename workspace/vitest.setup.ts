import { expect } from "vitest";
import { type ZodSafeParseResult } from "zod/v4";

// --- Custom Zod Matchers ---

export function toBeZodSuccess(received: ZodSafeParseResult<any>) {
  const pass = received.success === true;
  return {
    pass,
    message: () =>
      pass
        ? `expected result not to be success, but got: ${JSON.stringify(received.data)}`
        : `expected result to be success, but got error:\n${JSON.stringify(received.error?.issues)}`,
  };
}

export function toBeZodFailure(
  received: ZodSafeParseResult<any>,
  expectedErrorMatch?: string | RegExp,
) {
  const pass =
    received.success === false &&
    (expectedErrorMatch === undefined ||
      received.error.issues
        .map((i) => i.message)
        .find((m) => {
          if (typeof expectedErrorMatch === "string") {
            return m === expectedErrorMatch;
          }
          return expectedErrorMatch.test(m);
        }) !== undefined);

  return {
    pass,
    message: () =>
      pass
        ? `expected result not to fail, but it did:\n${JSON.stringify(received.error.issues)}`
        : `expected result to fail with '${expectedErrorMatch}' but has issues: ${JSON.stringify(received.error?.issues)} `,
  };
}

// --- Register Matchers ---

expect.extend({
  toBeZodSuccess,
  toBeZodFailure,
});

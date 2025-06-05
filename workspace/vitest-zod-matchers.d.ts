import "vitest";

interface CustomMatchers<R = unknown> {
  toBeZodSuccess(expected?: any): R;
  toBeZodFailure(expectedErrorMessage?: string | RegExp): R;
}

declare module "vitest" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface Matchers<T = any> extends CustomMatchers<T> {}
}

import { describe, it, expect } from "vitest";
import { pad2, timeLeft } from "../../src/lib/countdown";

const TARGET = Date.parse("2026-12-10T00:00:00+05:30");
const SEC = 1000;
const MIN = 60 * SEC;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;

describe("timeLeft", () => {
  it("splits a real offset into days, hours, minutes, seconds", () => {
    const now = Date.parse("2026-11-14T00:41:15+05:30");
    expect(timeLeft(TARGET, now)).toEqual({ days: 25, hours: 23, minutes: 18, seconds: 45, done: false });
  });

  it("reports one second remaining", () => {
    expect(timeLeft(TARGET, TARGET - SEC)).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 1, done: false });
  });

  it("is done at the exact target", () => {
    expect(timeLeft(TARGET, TARGET)).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 0, done: true });
  });

  it("stays zeroed and done after the target", () => {
    expect(timeLeft(TARGET, TARGET + 5 * DAY)).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 0, done: true });
  });

  it("handles 1d 1h 1m 1s", () => {
    expect(timeLeft(TARGET, TARGET - (DAY + HOUR + MIN + SEC))).toEqual({
      days: 1,
      hours: 1,
      minutes: 1,
      seconds: 1,
      done: false,
    });
  });
});

describe("pad2", () => {
  it.each([
    [0, "00"],
    [7, "07"],
    [42, "42"],
    [123, "123"],
  ])("pad2(%i) is %s", (n, expected) => {
    expect(pad2(n)).toBe(expected);
  });
});

import { afterEach, describe, expect, it, vi } from "vitest";
import { daysLeft } from "@/lib/ics";

describe("daysLeft", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("counts calendar days in Seoul, not elapsed hours", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2027-02-12T15:00:00.000Z"));

    expect(daysLeft()).toBe(1);
  });

  it("shows D-day from midnight on the wedding date in Seoul", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2027-02-13T15:00:00.000Z"));

    expect(daysLeft()).toBe(0);
  });

  it("stays at zero after the wedding date", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2027-02-14T15:00:00.000Z"));

    expect(daysLeft()).toBe(0);
  });
});
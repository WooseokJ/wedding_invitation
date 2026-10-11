import { afterEach, describe, expect, it, vi } from "vitest";
import { daysLeft, timeUntilWedding } from "@/lib/ics";

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

  it("returns days, hours, minutes, and seconds until the ceremony", () => {
    expect(timeUntilWedding(new Date("2027-02-12T15:00:00.000Z"))).toEqual({
      days: 1,
      hours: 12,
      minutes: 0,
      seconds: 0,
    });
  });

  it("counts down the final seconds and stops at zero", () => {
    expect(timeUntilWedding(new Date("2027-02-14T02:59:37.000Z"))).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 23,
    });
    expect(timeUntilWedding(new Date("2027-02-14T03:00:01.000Z"))).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  });
});
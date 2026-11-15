import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { InviteHeader } from "@/components/InviteHeader";
import { wedding } from "@/lib/wedding";

describe("InviteHeader fortune pocket", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("opens a random fortune after five clicks on the wedding title", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    render(<InviteHeader />);

    const weddingTitle = screen.getByRole("link", { name: /Wedding of 우석 · 소현/ });
    for (let click = 0; click < 4; click += 1) {
      fireEvent.click(weddingTitle);
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    }

    fireEvent.click(weddingTitle);

    const dialog = await screen.findByRole("dialog");
    expect(dialog).toHaveTextContent(wedding.fortunePocket.messages[0]);
    expect(dialog).toHaveTextContent(wedding.fortunePocket.messages2[0]);
  });
});

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { Guestbook } from "@/components/Guestbook";

function renderGuestbook() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <Guestbook />
    </QueryClientProvider>,
  );
}

describe("Guestbook author controls", () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem("wedding_guestbook_author_id", "me");
    localStorage.setItem(
      "wedding_guestbook_entries",
      JSON.stringify([
        {
          id: "entry-1",
          name: "나",
          author_id: "me",
          message: "축하합니다!",
          attending: true,
          created_at: "2025-07-01T00:00:00.000Z",
        },
        {
          id: "entry-2",
          name: "다른 사람",
          author_id: "someone-else",
          message: "잘 되길 바랍니다.",
          attending: false,
          created_at: "2025-07-02T00:00:00.000Z",
        },
      ]),
    );
  });

  it("shows a delete button only for the current author's entries", async () => {
    renderGuestbook();

    expect(await screen.findByText("나")).toBeInTheDocument();

    const buttons = await screen.findAllByRole("button", { name: /삭제/i });
    expect(buttons).toHaveLength(1);

    fireEvent.click(buttons[0]);

    const savedEntries = JSON.parse(localStorage.getItem("wedding_guestbook_entries") ?? "[]");
    expect(savedEntries).toHaveLength(1);
    expect(savedEntries[0].id).toBe("entry-2");
  });
});

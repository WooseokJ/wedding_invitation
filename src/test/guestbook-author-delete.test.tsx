import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { Guestbook } from "@/components/Guestbook";

const mockUseQuery = vi.fn();
const mockEq = vi.fn();

vi.mock("@tanstack/react-query", () => ({
  useQuery: (...args: unknown[]) => mockUseQuery(...args),
}));

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    from: vi.fn(() => ({
      insert: vi.fn(),
      delete: () => ({
        eq: mockEq,
      }),
    })),
  },
}));

vi.mock("@/components/Reveal", () => ({
  Reveal: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe("Guestbook author controls", () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem("wedding_guestbook_author_id", "me");

    mockEq.mockReset();
    mockEq.mockImplementation(() => ({
      eq: mockEq,
      then: undefined,
    }));

    mockUseQuery.mockReturnValue({
      data: [
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
      ],
      isPending: false,
      isError: false,
      refetch: vi.fn(),
    });
  });

  it("shows a delete button only for the current author's entries", async () => {
    render(<Guestbook />);

    const buttons = screen.getAllByRole("button", { name: /삭제/i });
    expect(buttons).toHaveLength(1);

    fireEvent.click(buttons[0]);
    expect(mockEq.mock.calls).toContainEqual(["id", "entry-1"]);
    expect(mockEq.mock.calls).toContainEqual(["author_id", "me"]);
  });
});

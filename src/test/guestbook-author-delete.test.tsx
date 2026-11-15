import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { Guestbook } from "@/components/Guestbook";

const mockUseQuery = vi.fn();
const mockEq = vi.fn();
const mockUpdateEq = vi.fn();
const mockUpdateSelect = vi.fn();
const mockUpdateMaybeSingle = vi.fn();
const mockUpdate = vi.fn();
const updateChain = {
  eq: mockUpdateEq,
  select: mockUpdateSelect,
  maybeSingle: mockUpdateMaybeSingle,
};

mockUpdateEq.mockImplementation(() => updateChain);
mockUpdateSelect.mockImplementation(() => updateChain);
mockUpdate.mockImplementation(() => updateChain);

async function openTicket() {
  vi.useFakeTimers();
  fireEvent.click(screen.getByRole("button", { name: "초대 티켓 열기" }));
  await act(async () => {
    await vi.advanceTimersByTimeAsync(1300);
  });
  vi.useRealTimers();
}

vi.mock("@tanstack/react-query", () => ({
  useQuery: (...args: unknown[]) => mockUseQuery(...args),
}));

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    from: vi.fn(() => ({
      insert: vi.fn(),
      update: mockUpdate,
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
    mockUpdate.mockClear();
    mockUpdateEq.mockClear();
    mockUpdateMaybeSingle.mockResolvedValue({
      data: { id: "entry-1" },
      error: null,
    });

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

    await openTicket();
    const buttons = screen.getAllByRole("button", { name: /삭제/i });
    expect(buttons).toHaveLength(1);

    fireEvent.click(buttons[0]);
    expect(mockEq.mock.calls).toContainEqual(["id", "entry-1"]);
    expect(mockEq.mock.calls).toContainEqual(["author_id", "me"]);
  });

  it("updates the existing entry with the author's ID", async () => {
    render(<Guestbook />);

    await openTicket();
    fireEvent.click(screen.getByRole("button", { name: "수정" }));
    fireEvent.change(screen.getByPlaceholderText("두 사람에게 전하고 싶은 말을 남겨 주세요."), {
      target: { value: "고쳐 쓴 축하 인사" },
    });
    fireEvent.click(screen.getByRole("button", { name: "수정사항 저장" }));

    await waitFor(() => {
      expect(mockUpdate).toHaveBeenCalledWith({
        name: "나",
        message: "고쳐 쓴 축하 인사",
        attending: true,
      });
    });
    expect(mockUpdateEq.mock.calls).toContainEqual(["id", "entry-1"]);
    expect(mockUpdateEq.mock.calls).toContainEqual(["author_id", "me"]);
  });
});

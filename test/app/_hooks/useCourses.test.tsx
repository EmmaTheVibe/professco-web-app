import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const mockRouterReplace = vi.fn();

vi.mock("next/navigation", () => ({
  useSearchParams: vi.fn(),
  useRouter: vi.fn(),
  usePathname: vi.fn(),
}));

vi.mock("@/app/_lib/data-service", () => ({
  getSortedCourses: vi.fn(),
}));

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { getSortedCourses } from "@/app/_lib/data-service";
import useFilterStore from "@/app/_utils/filter-store";
import useCourses from "@/app/_hooks/useCourses";

const mockedGetSortedCourses = vi.mocked(getSortedCourses);

function paramsFor(query: string) {
  return new URLSearchParams(query);
}

function setup(query: string) {
  vi.mocked(useSearchParams).mockReturnValue(paramsFor(query) as any);
  vi.mocked(usePathname).mockReturnValue("/courses");
  vi.mocked(useRouter).mockReturnValue({ replace: mockRouterReplace } as any);
}

function wrapper({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

beforeEach(() => {
  mockRouterReplace.mockClear();
  mockedGetSortedCourses.mockReset();
  mockedGetSortedCourses.mockResolvedValue({ courses: [], count: 0 });
  useFilterStore.setState({ activeTab: "all" });
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("useCourses", () => {
  it("uses the ?exam= URL param only when the active tab is 'all'", async () => {
    setup("?exam=ican");

    renderHook(() => useCourses(), { wrapper });

    await waitFor(() => expect(mockedGetSortedCourses).toHaveBeenCalled());
    expect(mockedGetSortedCourses).toHaveBeenCalledWith(
      expect.objectContaining({ examValue: "ican" }),
    );
  });

  it("ignores the ?exam= URL param when a specific tab is already active", async () => {
    useFilterStore.setState({ activeTab: "cima" });
    setup("?exam=ican");

    renderHook(() => useCourses(), { wrapper });

    await waitFor(() => expect(mockedGetSortedCourses).toHaveBeenCalled());
    expect(mockedGetSortedCourses).toHaveBeenCalledWith(
      expect.objectContaining({ examValue: "cima" }),
    );
  });

  it("maps price=free alone to a 0-0 amount range", async () => {
    setup("?price=free");

    renderHook(() => useCourses(), { wrapper });

    await waitFor(() =>
      expect(mockedGetSortedCourses).toHaveBeenCalledWith(
        expect.objectContaining({ minAmount: 0, maxAmount: 0 }),
      ),
    );
  });

  it("maps price=paid alone to a minimum of 1 with no upper bound", async () => {
    setup("?price=paid");

    renderHook(() => useCourses(), { wrapper });

    await waitFor(() =>
      expect(mockedGetSortedCourses).toHaveBeenCalledWith(
        expect.objectContaining({ minAmount: 1, maxAmount: null }),
      ),
    );
  });

  it("sends no amount constraint to the backend when both free and paid are selected, and filters client-side instead", async () => {
    mockedGetSortedCourses.mockResolvedValue({
      courses: [
        { id: 1, amount: 0 },
        { id: 2, amount: 500 },
      ] as any,
      count: 2,
    });
    setup("?price=free&price=paid");

    const { result } = renderHook(() => useCourses(), { wrapper });

    await waitFor(() => expect(result.current.courses).toHaveLength(2));
    expect(mockedGetSortedCourses).toHaveBeenCalledWith(
      expect.objectContaining({ minAmount: null, maxAmount: null }),
    );
  });

  it("only accepts a rating within the valid 0-4 range", async () => {
    setup("?rating=3");
    renderHook(() => useCourses(), { wrapper });
    await waitFor(() =>
      expect(mockedGetSortedCourses).toHaveBeenCalledWith(
        expect.objectContaining({ minRating: 3 }),
      ),
    );

    mockedGetSortedCourses.mockClear();
    setup("?rating=7");
    renderHook(() => useCourses(), { wrapper });
    await waitFor(() =>
      expect(mockedGetSortedCourses).toHaveBeenCalledWith(
        expect.objectContaining({ minRating: null }),
      ),
    );
  });

  it("builds a sorted, order-independent cache key for level filters", async () => {
    setup("?level=intermediate&level=beginner");

    renderHook(() => useCourses(), { wrapper });

    await waitFor(() =>
      expect(mockedGetSortedCourses).toHaveBeenCalledWith(
        expect.objectContaining({ levels: "beginner,intermediate" }),
      ),
    );
  });

  it("falls back to no tag filter when the tag isn't in the known backend list", async () => {
    setup("?tags=not-a-real-tag");

    renderHook(() => useCourses(), { wrapper });

    await waitFor(() =>
      expect(mockedGetSortedCourses).toHaveBeenCalledWith(
        expect.objectContaining({ tag: null }),
      ),
    );
  });

  it("defaults sort_order to desc when sort_by is set but sort_order is missing", async () => {
    setup("?sort_by=amount");

    renderHook(() => useCourses(), { wrapper });

    await waitFor(() =>
      expect(mockedGetSortedCourses).toHaveBeenCalledWith(
        expect.objectContaining({ sortBy: "amount", sortOrder: "desc" }),
      ),
    );
  });

  it("honors an explicit sort_order instead of the desc default", async () => {
    setup("?sort_by=amount&sort_order=asc");

    renderHook(() => useCourses(), { wrapper });

    await waitFor(() =>
      expect(mockedGetSortedCourses).toHaveBeenCalledWith(
        expect.objectContaining({ sortOrder: "asc" }),
      ),
    );
  });

  it("honors an explicit sort_order even without a sort_by (URL value wins over the sortBy-derived default)", async () => {
    setup("?sort_order=asc");

    renderHook(() => useCourses(), { wrapper });

    await waitFor(() =>
      expect(mockedGetSortedCourses).toHaveBeenCalledWith(
        expect.objectContaining({ sortBy: null, sortOrder: "asc" }),
      ),
    );
  });

  it("leaves sort_order null when neither sort_by nor a valid sort_order is present", async () => {
    setup("");

    renderHook(() => useCourses(), { wrapper });

    await waitFor(() =>
      expect(mockedGetSortedCourses).toHaveBeenCalledWith(
        expect.objectContaining({ sortBy: null, sortOrder: null }),
      ),
    );
  });

  it("defaults page to 1 and limit to 12 when absent from the URL", async () => {
    setup("");

    renderHook(() => useCourses(), { wrapper });

    await waitFor(() =>
      expect(mockedGetSortedCourses).toHaveBeenCalledWith(
        expect.objectContaining({ page: 1, limit: 12 }),
      ),
    );
  });

  it("corrects the URL and reports loading when the page param is past the last real page", async () => {
    mockedGetSortedCourses.mockResolvedValue({ courses: [], count: 24 });
    setup("?page=99&limit=12");

    const { result } = renderHook(() => useCourses(), { wrapper });

    await waitFor(() => expect(mockRouterReplace).toHaveBeenCalled());
    expect(mockRouterReplace).toHaveBeenCalledWith("/courses?page=2&limit=12", {
      scroll: false,
    });
    expect(result.current.isLoading).toBe(true);
    expect(result.current.courses).toEqual([]);
  });
});

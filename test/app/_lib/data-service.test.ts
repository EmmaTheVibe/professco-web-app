import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  getSortedCourses,
  getCoursesByType,
  getCourseById,
} from "@/app/_lib/data-service";

const API_BASE_URL = "https://api.test.example";

function mockFetchOnce(body: unknown, ok = true, status = 200) {
  const fetchMock = vi.fn().mockResolvedValue({
    ok,
    status,
    json: () => Promise.resolve(body),
  });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

function calledUrl(fetchMock: ReturnType<typeof vi.fn>) {
  return new URL(fetchMock.mock.calls[0][0] as string);
}

beforeEach(() => {
  vi.stubEnv("NEXT_PUBLIC_API_BASE_URL", API_BASE_URL);
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe("getSortedCourses", () => {
  it("always sends a sort_by/sort_order, defaulting to amount/desc", async () => {
    const fetchMock = mockFetchOnce({ data: [], total: 0 });

    await getSortedCourses({});

    const url = calledUrl(fetchMock);
    expect(url.searchParams.get("sort_by")).toBe("amount");
    expect(url.searchParams.get("sort_order")).toBe("desc");
  });

  it("honors an explicit sortBy/sortOrder instead of the defaults", async () => {
    const fetchMock = mockFetchOnce({ data: [], total: 0 });

    await getSortedCourses({ sortBy: "amount", sortOrder: "asc" });

    const url = calledUrl(fetchMock);
    expect(url.searchParams.get("sort_order")).toBe("asc");
  });

  it("omits exam_bodies for the 'all' exam value (case-insensitive)", async () => {
    const fetchMock = mockFetchOnce({ data: [], total: 0 });

    await getSortedCourses({ examValue: "ALL" });

    expect(calledUrl(fetchMock).searchParams.has("exam_bodies")).toBe(false);
  });

  it("uppercases a specific exam value into exam_bodies", async () => {
    const fetchMock = mockFetchOnce({ data: [], total: 0 });

    await getSortedCourses({ examValue: "ican" });

    expect(calledUrl(fetchMock).searchParams.get("exam_bodies")).toBe("ICAN");
  });

  it("omits min_amount/max_amount/min_rating/levels/tags when null", async () => {
    const fetchMock = mockFetchOnce({ data: [], total: 0 });

    await getSortedCourses({
      minAmount: null,
      maxAmount: null,
      minRating: null,
      levels: null,
      tag: null,
    });

    const params = calledUrl(fetchMock).searchParams;
    expect(params.has("min_amount")).toBe(false);
    expect(params.has("max_amount")).toBe(false);
    expect(params.has("min_rating")).toBe(false);
    expect(params.has("levels")).toBe(false);
    expect(params.has("tags")).toBe(false);
  });

  it("includes min_amount/max_amount/min_rating/levels/tags when provided", async () => {
    const fetchMock = mockFetchOnce({ data: [], total: 0 });

    await getSortedCourses({
      minAmount: 0,
      maxAmount: 5000,
      minRating: 3,
      levels: "beginner,intermediate",
      tag: "new",
    });

    const params = calledUrl(fetchMock).searchParams;
    expect(params.get("min_amount")).toBe("0");
    expect(params.get("max_amount")).toBe("5000");
    expect(params.get("min_rating")).toBe("3");
    expect(params.get("levels")).toBe("beginner,intermediate");
    expect(params.get("tags")).toBe("new");
  });

  it("forwards page and limit", async () => {
    const fetchMock = mockFetchOnce({ data: [], total: 0 });

    await getSortedCourses({ page: 3, limit: 24 });

    const params = calledUrl(fetchMock).searchParams;
    expect(params.get("page")).toBe("3");
    expect(params.get("limit")).toBe("24");
  });

  it("maps the response into { courses, count }", async () => {
    mockFetchOnce({ data: [{ id: 1 }, { id: 2 }], total: 42 });

    const result = await getSortedCourses({});

    expect(result).toEqual({ courses: [{ id: 1 }, { id: 2 }], count: 42 });
  });

  it("defaults to an empty course list and zero count on a malformed response", async () => {
    mockFetchOnce({});

    const result = await getSortedCourses({});

    expect(result).toEqual({ courses: [], count: 0 });
  });

  it("throws when the backend responds with a non-ok status", async () => {
    mockFetchOnce({ message: "nope" }, false, 500);

    await expect(getSortedCourses({})).rejects.toThrow();
  });
});

describe("getCoursesByType", () => {
  it("uppercases the exam type into the URL slug", async () => {
    const fetchMock = mockFetchOnce({ data: { data: [], total: 0 } });

    await getCoursesByType("ican");

    expect(calledUrl(fetchMock).pathname).toContain("/exam_body/ICAN/courses");
  });

  it("maps a nested data.data/data.total response into { courses, count }", async () => {
    mockFetchOnce({
      data: { data: [{ id: 1 }], total: 7 },
    });

    const result = await getCoursesByType("ican");

    expect(result).toEqual({ courses: [{ id: 1 }], count: 7 });
  });

  it("falls back to an empty list when data.data isn't an array", async () => {
    mockFetchOnce({ data: { data: null, total: 0 } });

    const result = await getCoursesByType("ican");

    expect(result).toEqual({ courses: [], count: 0 });
  });
});

describe("getCourseById", () => {
  it("requests course/:id and returns the parsed body", async () => {
    const fetchMock = mockFetchOnce({ id: 9, title: "Financial Reporting" });

    const result = await getCourseById(9);

    expect(calledUrl(fetchMock).pathname).toContain("/course/9");
    expect(result).toEqual({ id: 9, title: "Financial Reporting" });
  });
});

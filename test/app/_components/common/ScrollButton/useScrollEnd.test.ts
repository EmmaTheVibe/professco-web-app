import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import useScrollEnd from "@/app/_components/common/ScrollButton/useScrollEnd";

class MockResizeObserver {
  callback: ResizeObserverCallback;
  observed: Element[] = [];

  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
  }

  observe(target: Element) {
    this.observed.push(target);
  }

  unobserve() {}

  disconnect() {}
}

let observers: MockResizeObserver[] = [];

beforeEach(() => {
  observers = [];
  vi.stubGlobal(
    "ResizeObserver",
    class extends MockResizeObserver {
      constructor(callback: ResizeObserverCallback) {
        super(callback);
        observers.push(this);
      }
    },
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
});

function setScrollMetrics(
  el: HTMLElement,
  metrics: Partial<
    Record<"scrollLeft" | "clientWidth" | "scrollWidth" | "scrollTop" | "clientHeight" | "scrollHeight", number>
  >,
) {
  Object.entries(metrics).forEach(([key, value]) => {
    Object.defineProperty(el, key, { value, configurable: true });
  });
}

function makeContainer() {
  const container = document.createElement("div");
  const child = document.createElement("div");
  container.appendChild(child);
  return { container, child };
}

describe("useScrollEnd", () => {
  it("is false when the content overflows horizontally", () => {
    const { container } = makeContainer();
    setScrollMetrics(container, { scrollLeft: 0, clientWidth: 100, scrollWidth: 400 });
    const ref = { current: container };

    const { result } = renderHook(() => useScrollEnd(ref));

    expect(result.current).toBe(false);
  });

  it("is true when the content already fits horizontally", () => {
    const { container } = makeContainer();
    setScrollMetrics(container, { scrollLeft: 0, clientWidth: 400, scrollWidth: 400 });
    const ref = { current: container };

    const { result } = renderHook(() => useScrollEnd(ref));

    expect(result.current).toBe(true);
  });

  it("becomes true once scrolled to the horizontal end", () => {
    const { container } = makeContainer();
    setScrollMetrics(container, { scrollLeft: 0, clientWidth: 100, scrollWidth: 400 });
    const ref = { current: container };

    const { result } = renderHook(() => useScrollEnd(ref));
    expect(result.current).toBe(false);

    act(() => {
      setScrollMetrics(container, { scrollLeft: 300 });
      container.dispatchEvent(new Event("scroll"));
    });

    expect(result.current).toBe(true);
  });

  it("uses vertical scroll metrics when axis is vertical", () => {
    const { container } = makeContainer();
    setScrollMetrics(container, { scrollTop: 0, clientHeight: 100, scrollHeight: 400 });
    const ref = { current: container };

    const { result } = renderHook(() => useScrollEnd(ref, "vertical"));
    expect(result.current).toBe(false);

    act(() => {
      setScrollMetrics(container, { scrollTop: 296 });
      container.dispatchEvent(new Event("scroll"));
    });

    expect(result.current).toBe(true);
  });

  it("observes the container's first child, not the container itself (regression: mask/scroll-button staleness bug)", () => {
    const { container, child } = makeContainer();
    setScrollMetrics(container, { scrollLeft: 0, clientWidth: 100, scrollWidth: 400 });
    const ref = { current: container };

    renderHook(() => useScrollEnd(ref));

    expect(observers).toHaveLength(1);
    expect(observers[0].observed).toEqual([child]);
  });

  it("re-checks when the observed child resizes (e.g. loading skeleton swapping for real content)", () => {
    const { container } = makeContainer();
    setScrollMetrics(container, { scrollLeft: 0, clientWidth: 100, scrollWidth: 100 });
    const ref = { current: container };

    const { result } = renderHook(() => useScrollEnd(ref));
    expect(result.current).toBe(true);

    act(() => {
      setScrollMetrics(container, { scrollWidth: 400 });
      observers[0].callback([] as ResizeObserverEntry[], observers[0] as unknown as ResizeObserver);
    });

    expect(result.current).toBe(false);
  });

  it("cleans up listeners and disconnects the observer on unmount", () => {
    const { container } = makeContainer();
    setScrollMetrics(container, { scrollLeft: 0, clientWidth: 100, scrollWidth: 400 });
    const ref = { current: container };
    const disconnectSpy = vi.spyOn(MockResizeObserver.prototype, "disconnect");
    const removeEventListenerSpy = vi.spyOn(container, "removeEventListener");

    const { unmount } = renderHook(() => useScrollEnd(ref));
    unmount();

    expect(disconnectSpy).toHaveBeenCalled();
    expect(removeEventListenerSpy).toHaveBeenCalledWith("scroll", expect.any(Function));
  });
});

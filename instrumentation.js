export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // Node.js 22 exposes a broken `localStorage` global when --localstorage-file
    // is passed without a valid path. Patch it to be a safe no-op on the server.
    if (
      typeof globalThis.localStorage !== "undefined" &&
      typeof globalThis.localStorage.getItem !== "function"
    ) {
      globalThis.localStorage = {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {},
        clear: () => {},
        key: () => null,
        length: 0,
      };
    }
  }
}

import { test } from "node:test";
import assert from "node:assert/strict";
import { readStoredAdmin, clearStoredAdmin } from "../src/services/adminStorage.js";

test("public requests tolerate unavailable storage in private browsing", () => {
    const previous = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
    try {
        Object.defineProperty(globalThis, "localStorage", {
            configurable: true,
            get() { throw new Error("Storage access denied"); },
        });
        assert.equal(readStoredAdmin(), null);
        assert.doesNotThrow(() => clearStoredAdmin());
    } finally {
        if (previous) Object.defineProperty(globalThis, "localStorage", previous);
        else delete globalThis.localStorage;
    }
});

test("malformed sessions do not break public requests even if removal fails", () => {
    const previous = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
    try {
        Object.defineProperty(globalThis, "localStorage", {
            configurable: true,
            value: {
                getItem: () => "invalid-json",
                removeItem: () => { throw new Error("Storage is read-only"); },
            },
        });
        assert.equal(readStoredAdmin(), null);
    } finally {
        if (previous) Object.defineProperty(globalThis, "localStorage", previous);
        else delete globalThis.localStorage;
    }
});

test("valid sessions retain their token", () => {
    const previous = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
    try {
        Object.defineProperty(globalThis, "localStorage", {
            configurable: true,
            value: { getItem: () => JSON.stringify({ token: "test-token" }) },
        });
        assert.deepEqual(readStoredAdmin(), { token: "test-token" });
    } finally {
        if (previous) Object.defineProperty(globalThis, "localStorage", previous);
        else delete globalThis.localStorage;
    }
});

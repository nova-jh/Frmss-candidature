// Private browsing can deny both reads and writes. Public forms must still work.
export function clearStoredAdmin() {
    try {
        localStorage.removeItem("admin");
    } catch {
        // Storage is unavailable; there is no accessible session to clear.
    }
}

export function readStoredAdmin() {
    try {
        return JSON.parse(localStorage.getItem("admin"));
    } catch {
        clearStoredAdmin();
        return null;
    }
}

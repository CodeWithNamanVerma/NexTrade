import React, { useState, useEffect } from "react";

/**
 * AuthGuard — wraps the entire dashboard.
 * On mount it calls GET /me on the backend.
 * If the user is NOT authenticated → redirect to the landing site login page.
 * While checking → show a full-screen loading spinner.
 */
const AuthGuard = ({ children }) => {
    const [status, setStatus] = useState("checking"); // "checking" | "ok" | "redirect"

    useEffect(() => {
        fetch("http://localhost:3002/me", { credentials: "include" })
            .then((r) => r.json())
            .then((data) => {
                if (data.loggedIn) {
                    setStatus("ok");
                } else {
                    setStatus("redirect");
                }
            })
            .catch(() => {
                // If backend is unreachable, let the user in anyway (dev mode convenience)
                setStatus("ok");
            });
    }, []);

    if (status === "checking") {
        return (
            <div
                style={{
                    minHeight: "100vh",
                    background: "#0A0C10",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 20,
                    fontFamily: "'Outfit', sans-serif",
                }}
            >
                {/* Animated logo */}
                <div
                    style={{
                        width: 52,
                        height: 52,
                        borderRadius: 14,
                        background: "linear-gradient(135deg, #00F5C4, #7C5CFC)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 28,
                        animation: "spin 1s linear infinite",
                    }}
                >
                    ⚡
                </div>
                <style>{`@keyframes spin { from { transform:rotate(0deg) } to { transform:rotate(360deg) } }`}</style>
                <p style={{ color: "#7D8598", fontSize: 14 }}>Verifying session…</p>
            </div>
        );
    }

    if (status === "redirect") {
        // Redirect to login page on the landing site
        window.location.href = "http://localhost:3000/login";
        return (
            <div
                style={{
                    minHeight: "100vh",
                    background: "#0A0C10",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'Outfit', sans-serif",
                    color: "#7D8598",
                    fontSize: 14,
                }}
            >
                Redirecting to login…
            </div>
        );
    }

    return children;
};

export default AuthGuard;

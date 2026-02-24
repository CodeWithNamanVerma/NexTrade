import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
    const [form, setForm] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res = await fetch("http://localhost:3002/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (data.success) {
                window.location.href = "http://localhost:3001";
            } else {
                setError(data.error || "Invalid username or password.");
            }
        } catch {
            setError("Cannot connect to server. Make sure backend is running.");
        }
        setLoading(false);
    };

    return (
        <div className="nt-auth-page">
            <div className="nt-auth-card">
                <Link to="/" className="nt-logo" style={{ justifyContent: "center", marginBottom: "28px" }}>
                    <div className="nt-logo-icon">⚡</div>
                    Nex<span>Trade</span>
                </Link>
                <h2>Welcome back</h2>
                <p>Log in to access your trading dashboard.</p>

                {error && <div className="nt-auth-error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="nt-auth-input-group">
                        <label>Username</label>
                        <input name="username" type="text" placeholder="yourname" value={form.username} onChange={handleChange} required />
                    </div>
                    <div className="nt-auth-input-group">
                        <label>Password</label>
                        <input name="password" type="password" placeholder="Your password" value={form.password} onChange={handleChange} required />
                    </div>
                    <button
                        type="submit"
                        className="btn-primary-nt"
                        style={{ width: "100%", justifyContent: "center", padding: "14px", marginTop: "8px", fontSize: "16px" }}
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Log In →"}
                    </button>
                </form>

                <div className="nt-auth-divider">Don't have an account?</div>
                <Link to="/signup">
                    <button className="btn-ghost-nt" style={{ width: "100%", justifyContent: "center" }}>
                        Open Free Account
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Login;

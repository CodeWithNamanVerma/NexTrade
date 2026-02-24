import React, { useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
    const [form, setForm] = useState({ username: "", email: "", password: "", confirm: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); setSuccess("");
        if (form.password !== form.confirm) {
            setError("Passwords do not match.");
            return;
        }
        setLoading(true);
        try {
            const res = await fetch("http://localhost:3002/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ username: form.username, email: form.email, password: form.password }),
            });
            const data = await res.json();
            if (data.success) {
                setSuccess("Account created! Redirecting to dashboard...");
                setTimeout(() => { window.location.href = "http://localhost:3001"; }, 1500);
            } else {
                setError(data.error || "Registration failed.");
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
                <h2>Create your account</h2>
                <p>Start your trading journey today — free forever.</p>

                {error && <div className="nt-auth-error">{error}</div>}
                {success && <div className="nt-auth-success">{success}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="nt-auth-input-group">
                        <label>Username</label>
                        <input name="username" type="text" placeholder="yourname" value={form.username} onChange={handleChange} required />
                    </div>
                    <div className="nt-auth-input-group">
                        <label>Email</label>
                        <input name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} />
                    </div>
                    <div className="nt-auth-input-group">
                        <label>Password</label>
                        <input name="password" type="password" placeholder="Min. 8 characters" value={form.password} onChange={handleChange} required />
                    </div>
                    <div className="nt-auth-input-group">
                        <label>Confirm Password</label>
                        <input name="confirm" type="password" placeholder="Repeat password" value={form.confirm} onChange={handleChange} required />
                    </div>
                    <button
                        type="submit"
                        className="btn-primary-nt"
                        style={{ width: "100%", justifyContent: "center", padding: "14px", marginTop: "8px", fontSize: "16px" }}
                        disabled={loading}
                    >
                        {loading ? "Creating Account..." : "Create Free Account →"}
                    </button>
                </form>

                <div className="nt-auth-divider">Already have an account?</div>
                <Link to="/login">
                    <button className="btn-ghost-nt" style={{ width: "100%", justifyContent: "center" }}>
                        Log In
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Signup;

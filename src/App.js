import React, { useState } from "react";
import "./App.css";

function resolveDashboardUrl() {
  const { protocol, hostname } = globalThis.location;

  if (hostname.includes("login-screen")) {
    return `${protocol}//${hostname.replace("login-screen", "dashboard-ui")}/`;
  }

  return `${protocol}//${hostname}/`;
}

export default function App() {
  const [mode, setMode] = useState("login"); 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) throw new Error("Invalid username or password");

      globalThis.location.href = resolveDashboardUrl();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, email }),
      });
      const text = await res.text();
      if (!res.ok) {
        throw new Error(text || "Błąd rejestracji");
      }
      setSuccess("Rejestracja udana! Możesz się zalogować.");
      setMode("login");
      setUsername("");
      setPassword("");
      setEmail("");
    } catch (err) {
      setError(err.message);
      console.error("[DEBUG] Error:", err);
    }
  };

  return (
    <div className="login-container">
      <h2>{mode === "login" ? "Logowanie IoT Agent" : "Rejestracja IoT Agent"}</h2>
      {mode === "login" ? (
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Login"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          
          <input
            type="password"
            placeholder="Hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Zaloguj</button>
          <div style={{ marginTop: "1rem", textAlign: "center" }}>
            <button type="button" className="link-button" onClick={() => { setMode("register"); setError(""); setSuccess(""); }}>Nie masz konta? Zarejestruj się</button>
          </div>
          {error && <div className="error">{error}</div>}
          {success && <div className="success">{success}</div>}
        </form>
      ) : (
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Login"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Zarejestruj</button>
          <div style={{ marginTop: "1rem", textAlign: "center" }}>
            <button type="button" className="link-button" onClick={() => { setMode("login"); setError(""); setSuccess(""); }}>Masz już konto? Zaloguj się</button>
          </div>
          {error && <div className="error">{error}</div>}
          {success && <div className="success">{success}</div>}
        </form>
      )}
    </div>
  );
}

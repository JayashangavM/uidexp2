import React, { useState } from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import UserProfile from "./UserProfile";

const btnStyle = bg => ({
  padding: 10,
  backgroundColor: bg,
  color: "#fff",
  border: "none",
  borderRadius: 5,
  fontSize: 16,
  cursor: "pointer"
});

const Experiment2 = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");

  // Google login (real)
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      setError(error.message);
    }
  };

  // Mock Email/Password Login/Register
  const handleEmailAuth = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }
    // Fake user object (instead of Firebase)
    const fakeUser = {
      displayName: email.split("@")[0],
      email: email,
      photoURL: "https://i.pravatar.cc/150?u=" + email, // random avatar
    };
    setUser(fakeUser);
  };

  const logout = async () => {
    try {
      await signOut(auth); // still works for Google
    } catch {}
    setUser(null);
  };

  return (
    <div style={{ textAlign: "center", padding: 50 }}>
      <h1>Experiment 2 - Login</h1>
      {user ? (
        <>
          <UserProfile user={user} />
          <button onClick={logout} style={btnStyle("#DB4437")}>
            Logout
          </button>
        </>
      ) : (
        <>
          <button
            onClick={loginWithGoogle}
            style={btnStyle("#4285F4")}
          >
            Login with Google
          </button>
          <div
            style={{
              margin: "30px auto",
              maxWidth: 300,
              textAlign: "left"
            }}
          >
            <form onSubmit={handleEmailAuth}>
              <h3 style={{ textAlign: "center" }}>
                {isRegister ? "Register" : "Login"} with Email
              </h3>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ width: "100%", padding: 8, marginBottom: 10 }}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{ width: "100%", padding: 8, marginBottom: 10 }}
                required
              />
              <button
                type="submit"
                style={btnStyle(isRegister ? "#2e7d32" : "#1976d2")}
              >
                {isRegister ? "Register" : "Login"}
              </button>
            </form>
            <div style={{ textAlign: "center", marginTop: 10 }}>
              <button
                onClick={() => setIsRegister(r => !r)}
                style={{
                  background: "none",
                  color: "#1976d2",
                  border: "none",
                  cursor: "pointer",
                  textDecoration: "underline"
                }}
              >
                {isRegister
                  ? "Already have an account? Login"
                  : "Don't have an account? Register"}
              </button>
            </div>
            {error && (
              <div style={{ color: "red", marginTop: 10 }}>{error}</div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Experiment2;

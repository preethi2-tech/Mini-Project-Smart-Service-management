import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/api/auth/login", {
        username,
        password,
      });

      // ✅ Login success
      navigate("/dashboard/home");
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Server error");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <img src="/logo.png" className="logo" />
        <h2>Welcome to Our Dashboard</h2>
        <p>Please login to continue</p>

        <form className="login-form" onSubmit={handleLogin}>
          <label>Username :</label>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />


          <label>Password :</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <div className="divider">OR</div>

        <button className="google-btn">
          <img
            className="google"
            src="https://developers.google.com/identity/images/g-logo.png"
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;

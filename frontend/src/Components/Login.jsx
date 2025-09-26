import React, { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

  const{serverUrl,setUserData}=useContext(UserDataContext)
   const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    try {
      const res = await axios.post(
        `${serverUrl}/api/auth/login`,   // 👈 your backend login endpoint
        { name },
        { withCredentials: true }       // send/receive cookie
      );

      setStatus(`✅ Logged in as ${res.data.name}`);
      // e.g. redirect to vote page if you have routing:
      setUserData(res.data); // store user context
       navigate("/");
    } catch (err) {
      console.log(err);
      const msg = err.response?.data?.message || err.message || "Login failed";
      setStatus(` ${msg}`);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto", textAlign: "center" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "0.5rem",
            marginBottom: "1rem",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "0.5rem 1rem",
            background: "#2196f3",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>
      {status && <p style={{ marginTop: "1rem" }}>{status}</p>}
    </div>
  );
}

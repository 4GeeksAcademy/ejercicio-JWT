import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { publicFetchSignup } from "../fetch/user";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Signup = () => {
  const [info, setInfo] = useState({
    name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setInfo((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFormInput = async (e) => {
    e.preventDefault();
    setError("");
    setMsg("");

    const { email, password, confirmPassword } = info;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!email || !password || !confirmPassword) {
      setError("Please fill out all fields.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const { confirmPassword: _, ...dataToSend } = info;

    setLoading(true);
    try {
      const response = await publicFetchSignup(dispatch, dataToSend);

      if (response.success) {
        setMsg("Signup successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError(response.message || "An error occurred during registration.");
      }
    } catch (err) {
      setError("Error during signup.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
<div className="d-flex justify-content-center align-items-center vh-100 bg-light">
<motion.div
className="card shadow p-4"
style={{ maxWidth: "500px", width: "100%" }}
initial={{ opacity: 0, y: 40 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5 }}
>
<h3 className="text-center mb-4">Create Account</h3>

    <form onSubmit={handleFormInput}>
      <div className="mb-3">
        <label htmlFor="nameInput" className="form-label">First Name</label>
        <input
          type="text"
          className="form-control"
          id="nameInput"
          name="name"
          value={info.name}
          onChange={handleChange}
          placeholder="Enter your first name"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="lastNameInput" className="form-label">Last Name</label>
        <input
          type="text"
          className="form-control"
          id="lastNameInput"
          name="last_name"
          value={info.last_name}
          onChange={handleChange}
          placeholder="Enter your last name"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="emailInput" className="form-label">Email address</label>
        <input
          type="email"
          className="form-control"
          id="emailInput"
          name="email"
          value={info.email}
          onChange={handleChange}
          placeholder="you@example.com"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="passwordInput" className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          id="passwordInput"
          name="password"
          value={info.password}
          onChange={handleChange}
          placeholder="Minimum 8 characters"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="confirmPasswordInput" className="form-label">Confirm Password</label>
        <input
          type="password"
          className="form-control"
          id="confirmPasswordInput"
          name="confirmPassword"
          value={info.confirmPassword}
          onChange={handleChange}
          required
        />
      </div>

      {error && (
        <div className="alert alert-danger py-2" role="alert">
          {error}
        </div>
      )}
      {msg && (
        <div className="alert alert-success py-2" role="alert">
          {msg}
        </div>
      )}

      <div className="d-grid mt-3">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>
      </div>

      <p className="text-center mt-3">
        Already have an account?{" "}
        <Link to="/login" className="text-decoration-none">
          Log in
        </Link>
      </p>
    </form>
  </motion.div>
</div>
);
};

export default Signup;
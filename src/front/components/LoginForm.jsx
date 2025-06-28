import React from "react";
import useLoginForm from "../hooks/UseLoginForm";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { publicFetchLogin } from "../fetch/user";
import { motion } from "framer-motion";
import { FaUser, FaLock } from "react-icons/fa";

const loginForm = ()=> {

  const {email,setEmail,password,setPassword}= useLoginForm()
    const navigate = useNavigate();

      const handleSubmit = async (e)=> {
          e.preventDefault()
              try {
                        const userData = await publicFetchLogin(email, password);
                             console.log("Login success:", userData);
                            navigate("/private");
                             }  catch (error) {
                                        console.error("Login failed:", error.message);
 }
}
    return (
<div className="d-flex justify-content-center align-items-center vh-100 bg-light">
<motion.div
initial={{ opacity: 0, y: 50 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5 }}
className="card shadow p-4"
style={{ maxWidth: "400px", width: "100%" }}
>
<h3 className="text-center mb-4">Sign In</h3>
<form onSubmit={handleSubmit}>
<div className="mb-3">
<label htmlFor="email" className="form-label">
<FaUser className="me-2" />
Email address
</label>
<input
type="email"
className="form-control"
id="email"
placeholder="Enter your email"
value={email}
onChange={(e) => setEmail(e.target.value)}
required
/>
<div className="form-text">
We'll never share your email with anyone else.
</div>
</div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          <FaLock className="me-2" />
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Log In
        </button>
      </div>

      <p className="text-center mt-3">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-decoration-none">
          Register here
        </Link>
      </p>
    </form>
  </motion.div>
</div>
);
};

export default loginForm;
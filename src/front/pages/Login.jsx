import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm.jsx";
import { publicFetchLogin } from "../fetch/user.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await publicFetchLogin(email, password);
      console.log("Login successful:", result);
      navigate("/hello");
    } catch (error) {
      setErrorMsg(error.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
      <LoginForm
        email={email}
        password={password}
        onEmailChange={(e) => setEmail(e.target.value)}
        onPasswordChange={(e) => setPassword(e.target.value)}
        onSubmit={handleLogin}  // PASAR el handler aquí
      />
    </div>
  );
};

export default Login;


// export const Login = () => {

//     const { store, dispatch } = useGlobalReducer()
//     const [email,setEmail]= useState("")
//     const [password,setPassword]= useState("")

//     function handleSubmit(){
//         e.prevDefault()
//         if(!password || !email){
//             alert("Please complete the fields")
//             return
//         }
//     }

// }

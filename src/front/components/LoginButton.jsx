import React from "react";
import { useNavigate } from "react-router-dom";

const LoginButton = ()=> {
    const navigate = useNavigate()
    
    const handleLoginClick = ()=> {
        navigate("/")
    };
    return (
       <button
      onClick={handleLoginClick}
      className="nav-button login navLoginbtn"
    >
      LOG IN
    </button>
    )

}

export default LoginButton;

const backendUrl = import.meta.env.VITE_BACKEND_URL



export const publicFetchLogin = async (email, password) => {
  try {
    if (password.trim() === "" || email.trim() === "") {
      throw new Error("the fields cannot be empty");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email format");
    }
    if (password.length < 8) {
      throw new Error("The password must have at least 8 characters");
    }
    const rawData = JSON.stringify({
      email: email,
      password: password,
    });
    const response = await fetch(`${backendUrl}/login`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: rawData,
    });
    if (!response.ok) {
      throw new Error(`Error fetching data code:${response.status}`);
    }
    const data = await response.json();
    if (!data.token) {
      throw new Error("The token has not been sent correctly to the user");
    }
    const token = data.token;
    localStorage.setItem("token", token);

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const privateFetchlogout =async()=>{
  try {
    const token = localStorage.getItem("token");
    if (!token){
      throw new Error ("Not token found. User not be logged.");
    }
    const response = await fetch(`${backendUrl}/logout`,{
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    })

    if (response.status === 401) {
  console.warn("Token inválido o expirado.");
  localStorage.removeItem("token"); // Limpia token
  return {
    success: false,
    message: "Token inválido o expirado. Sesión cerrada localmente.",
  };
}

    if (!response.ok){
      throw new Error(`Logout failed with status ${response.status}`);
    }
    localStorage.removeItem("token");
    return {success: true, message: "Logged out successfully"};
  }
  catch (error){
    console.error("logout error:", error);
    return {success: false, message: error.message}
  }

}

export const publicFetchSignup = async (dispatch, info) => {
  try {
    const response = await fetch(`${backendUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    });
    if (response.status === 201) {
      const data = await response.json();
      dispatch({ type: "signup", payload: data.user});
      return { success: true, message: "Signup successful! Please login." };
    } else if (response.status === 400) {
      const errorMsg = await response.json();
      return {
        success: false,
        error: errorMsg.Error,
      };
    } else {
      const errorData = await response.json();
      console.error("Signup failed:", errorData);
      return {
        success: false,
        message: errorData.Msg,
      };
    }
  } catch (error) {
    console.error("Network error:", error);
    return {
      success: false,
      message: "Network error. Please try again later.",
    };
  }
};


export const privateFetchgetInfo = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found");
    }
    const response = await fetch(`${backendUrl}/userinfo`, {
      method: "POST",
      headers: { authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      throw new Error(`Error fetching data ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
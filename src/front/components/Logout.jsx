import { useState,useEffect } from "react";
import { privateFetchlogout } from "../fetch/user";

const Logout = ()=> {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const onStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", onStorageChange);
    return () => window.removeEventListener("storage", onStorageChange);
  }, []);

  const handleLogout = async () => {
    const res = await privateFetchlogout();
    setIsLoggedIn(false); // Actualizar estado inmediatamente
    
    // Mostrar feedback al usuario
    if (res.success) {
      alert("Has cerrado sesión exitosamente");
    } else {
      alert(res.message); // Mostrar el mensaje de error específico
    }
    
    navigate("/login"); // Redirigir siempre
  };
return (
    <nav className="navbar navbar-light bg-light">
      <div className="container d-flex justify-content-between">
        <Link to="/" className="navbar-brand mb-0 h1">
          Home
        </Link>

        <div>
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="btn btn-outline-primary me-2">
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary">
                Register
              </Link>
            </>
          ) : (
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );


}

export default Logout
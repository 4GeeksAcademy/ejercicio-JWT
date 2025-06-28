import { Link, useNavigate} from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
 

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container d-flex justify-content-between">
        <Link to="/" className="navbar-brand mb-0 h1">
          Home
        </Link>

        <div>
            <>
              <Link to="/login" className="btn btn-outline-primary me-2">
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary">
                Register
              </Link>
            </>
        </div>
      </div>
    </nav>
  );
};
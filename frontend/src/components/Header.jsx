import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const [role, setRole] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Sync role state with localStorage changes (logout, delete, login)
  useEffect(() => {
    const updateRole = () => {
      setRole(localStorage.getItem("role"));
    };

    updateRole(); // initial load

    window.addEventListener("storage", updateRole);
    return () => window.removeEventListener("storage", updateRole);
  }, []);

  function logoutUser() {
    localStorage.removeItem("role");
    localStorage.removeItem("studentId");
    localStorage.removeItem("employerId");

    setRole(null);
    navigate("/");
  }

  return (
    <header className="header1">
      <div className="logo">
        <Link to="/"><img src="/media/logo.png" className="imgl" alt="logo" /></Link>
      </div>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <img 
          src={menuOpen ? "/media/close.png" : "/media/menu.png"} 
          style={{ width:"30px", height:"30px" }}
          alt="menu"
        />
      </div>

      <nav className={`nav1 ${menuOpen ? "show" : ""}`}>
        <Link className="ak active" to="/Home"><b>Home</b></Link>
        <Link className="ak hov" to="/jobs"><b>Jobs</b></Link>
        <Link className="ak hov" to="/StudentServices"><b>Student Services</b></Link>
        <Link className="ak hov" to="/rating"><b>Ratings</b></Link>
        <Link className="ak hov" to="/contact"><b>Contact Us</b></Link>

        <div className="line"></div>

        {(role === "student" || role === "employer") && (
          <>
            
            <Link className="ak hov" to="/Notifications">
              <img 
                style={{ width: "20px", height: "20px" }} 
                src="/media/notification-bell.png" 
                alt="notification"
              />
            </Link>

            
            <div className="user-wrapper">
              <img 
                src="/media/user1.png"
                className="user-icon"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                alt="user"
              />

              {userMenuOpen && (
                <div className="correctmenu">
                  <div className="signed-as">
                    {role === "student" ? "Signed in as Student" : "Signed in as Employer"}
                  </div>

                  <Link
                    to={role === "student" ? "/stdashboard1" : "/empdash1"}
                    className="menu-link"
                  >
                    ▦ Dashboard
                  </Link>

                  <button onClick={logoutUser} className="menu-link logout">
                    ↩ Logout
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {!role && (
          <>
            <Link className="ak hov" to="/login"><b>Login</b></Link>
            <Link className="ak hov" to="/sign"><b>Sign Up</b></Link>
          </>
        )}
      </nav>
    </header>
  );
}

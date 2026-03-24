import { useNavigate, Outlet } from "react-router-dom";
import "./Layout.css";

const Layout = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="layout">

      {/* Sidebar */}
      <div className="sidebar">

        {/* Logo */}
        <div className="sidebar-logo">
          <img src="/logo2.png" alt="SSD Logo" />
          <h2>SSD</h2>
        </div>

        <p className="sidebar-welcome">
          Welcome to Smart Service Dashboard
        </p>

        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="Search..." />
        </div>

        <ul className="menu">
          <li onClick={() => navigate("/dashboard/home")}>🏠 Home</li>
          <li onClick={() => navigate("/dashboard/student")}>🎓 Student</li>
          <li onClick={() => navigate("/dashboard/admin")}>🛠 Admin</li>
          <li onClick={() => navigate("/dashboard/staff")}>🧑‍🔧 Staff</li>
          <button className="logout-btn" onClick={handleLogout}>
          🚪 Logout
        </button>
        </ul>

        

      </div>

      {/* Main Content */}
      <div className="main-content">
        <Outlet />
      </div>

    </div>
  );
};

export default Layout;
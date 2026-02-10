import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import "./Layout.css";




const Layout = () => {
 
  const navigate = useNavigate();

  return (
    <div className="layout">
      
      {/* Sidebar */}
        <div className="sidebar">

        {/* Logo */}
        <div className="sidebar-logo">
            <img src="/logo2.png" alt="SSD Logo" />
            <h2>SSD</h2>
        </div>

        {/* Welcome text */}
        <p className="sidebar-welcome">
            Welcome to Smart Service Dashboard
        </p>

        {/* Search bar */}
        <div className="search-box">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="Search..." />
        </div>

        {/* Menu */}
        <ul className="menu">
           <li onClick={() => navigate("/dashboard/home")}>🏠 Home</li>
          <li onClick={() => navigate("/dashboard/student")}>🎓 Student</li>
          <li onClick={() => navigate("/dashboard/admin")}>🛠 Admin</li>
          <li onClick={() => navigate("/dashboard/staff")}>🧑‍🔧 Staff</li>
        </ul>

        </div>
         {/* MAIN PAGE CONTENT */}
          <div className="main-content">
            <Outlet />
          </div>
              
    </div>
    
    
  );
};

export default Layout;

import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

function Topbar() {
  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="topbar">
      {/* LEFT SIDE */}
      <div className="topbar-left">
        <h3 className="topbar-logo">WEB CODSHOP</h3>
        <span className="topbar-sub">Admin Panel</span>
      </div>

      {/* RIGHT SIDE */}
      <div className="topbar-right">
        <div className="topbar-user">
          <div className="topbar-avatar">
            {user?.name?.charAt(0) ||
              user?.email?.charAt(0) ||
              "A"}
          </div>

          <div className="topbar-userinfo">
            <span className="topbar-username">
              {user?.name || user?.email || "Admin"}
            </span>
            <span className="topbar-role">Administrator</span>
          </div>
        </div>

        <button className="topbar-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Topbar;
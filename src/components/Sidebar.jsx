import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        WEB CODSHOP
      </div>

      <div className="sidebar-menu">
        <NavLink to="/dashboard" className="sidebar-link">
          Dashboard
        </NavLink>

        <NavLink to="/products" className="sidebar-link">
          Products
        </NavLink>

        <NavLink to="/categories" className="sidebar-link">
          Categories
        </NavLink>

        <NavLink to="/orders" className="sidebar-link">
          Orders
        </NavLink>

        <NavLink to="/customers" className="sidebar-link">
          Customers
        </NavLink>

        <NavLink to="/coupons" className="sidebar-link">
          Coupons
        </NavLink>

        <NavLink to="/banners" className="sidebar-link">
          Banners
        </NavLink>

        <NavLink to="/settings" className="sidebar-link">
          Settings
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
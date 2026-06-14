import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      style={{
        width: "250px",
        background: "#0f172a",
        color: "#fff",
        padding: "20px",
      }}
    >
      <h2>WEB CODSHOP</h2>

      <div
        style={{
          marginTop: "25px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <Link
          to="/dashboard"
          style={{
            color: "#fff",
            textDecoration: "none",
          }}
        >
          Dashboard
        </Link>

        <Link
          to="/products"
          style={{
            color: "#fff",
            textDecoration: "none",
          }}
        >
          Products
        </Link>

        <Link
          to="/categories"
          style={{
            color: "#fff",
            textDecoration: "none",
          }}
        >
          Categories
        </Link>

        <Link
          to="/orders"
          style={{
            color: "#fff",
            textDecoration: "none",
          }}
        >
          Orders
        </Link>

        <Link
          to="/customers"
          style={{
            color: "#fff",
            textDecoration: "none",
        }}
      >
        Customers
      </Link>

        

      </div>
    </div>
  );
}

export default Sidebar;
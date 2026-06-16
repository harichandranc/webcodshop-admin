import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function AdminLayout({ children }) {
  return (
    <div>
      {/* SIDEBAR (fixed) */}
      <Sidebar />

      {/* MAIN AREA */}
      <div
        style={{
          marginLeft: "250px", // IMPORTANT (matches sidebar width)
          minHeight: "100vh",
          background: "#0b1220",
        }}
      >
        {/* TOPBAR */}
        <Topbar />

        {/* PAGE CONTENT */}
        <div
          style={{
            padding: "25px",
            paddingTop: "65px", // IMPORTANT (topbar height + spacing)
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
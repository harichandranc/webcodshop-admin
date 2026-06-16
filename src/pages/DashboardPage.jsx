import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import { getDashboardStats } from "../services/dashboardService";

function StatCard({ title, value, icon, color }) {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #0f172a, #111827)",
        padding: "20px",
        borderRadius: "16px",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
        transition: "0.3s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "translateY(-4px)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.transform = "translateY(0px)")
      }
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <p style={{ color: "#94a3b8", fontSize: "13px" }}>{title}</p>
          <h2 style={{ color: "#fff", fontSize: "26px", marginTop: "8px" }}>
            {value}
          </h2>
        </div>

        <div
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "12px",
            background: color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
          }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

function DashboardPage() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    activeProducts: 0,
    inactiveProducts: 0,
    featuredProducts: 0,
    totalCategories: 0,
    totalOrders: 0,
    pendingOrders: 0,
    paidOrders: 0,
    completedOrders: 0,
    totalRevenue: 0,
    completedRevenue: 0,
    recentOrders: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div style={{ padding: "10px" }}>
        {/* Header */}
        <div style={{ marginBottom: "25px" }}>
          <h1 style={{ color: "#fff", fontSize: "28px" }}>
            Dashboard
          </h1>
          <p style={{ color: "#94a3b8" }}>
            Overview of your store performance
          </p>
        </div>

        {/* Stats Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "16px",
          }}
        >
          <StatCard
            title="Total Products"
            value={loading ? "..." : stats.totalProducts}
            icon="📦"
            color="#2563eb"
          />

          <StatCard
            title="Active Products"
            value={loading ? "..." : stats.activeProducts}
            icon="🟢"
            color="#16a34a"
          />

          <StatCard
            title="Inactive Products"
            value={loading ? "..." : stats.inactiveProducts}
            icon="⚪"
            color="#64748b"
          />

          <StatCard
            title="Featured Products"
            value={loading ? "..." : stats.featuredProducts}
            icon="⭐"
            color="#f59e0b"
          />

          <StatCard
            title="Categories"
            value={loading ? "..." : stats.totalCategories}
            icon="📂"
            color="#a855f7"
          />

          <StatCard
            title="Total Orders"
            value={loading ? "..." : stats.totalOrders}
            icon="🧾"
            color="#0ea5e9"
          />

          <StatCard
            title="Pending Orders"
            value={loading ? "..." : stats.pendingOrders}
            icon="⏳"
            color="#f97316"
          />

          <StatCard
            title="Paid Orders"
            value={loading ? "..." : stats.paidOrders}
            icon="💳"
            color="#22c55e"
          />

          <StatCard
            title="Completed Orders"
            value={loading ? "..." : stats.completedOrders}
            icon="✅"
            color="#10b981"
          />

          <StatCard
            title="Total Revenue"
            value={loading ? "..." : `₹${stats.totalRevenue}`}
            icon="💰"
            color="#eab308"
          />

          <StatCard
            title="Completed Revenue"
            value={loading ? "..." : `₹${stats.completedRevenue}`}
            icon="📈"
            color="#14b8a6"
          />
        </div>

        {/* Recent Orders */}
        <div
          style={{
            marginTop: "25px",
            background: "linear-gradient(135deg, #0f172a, #111827)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "16px",
            padding: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
          }}
        >
          <h2 style={{ color: "#fff", marginBottom: "15px" }}>
            Recent Orders
          </h2>

          {stats.recentOrders?.length === 0 ? (
            <p style={{ color: "#94a3b8" }}>No recent orders.</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", color: "#cbd5e1" }}>
                <thead>
                  <tr style={{ textAlign: "left", color: "#94a3b8" }}>
                    <th style={{ padding: "10px" }}>Customer</th>
                    <th style={{ padding: "10px" }}>Product</th>
                    <th style={{ padding: "10px" }}>Amount</th>
                    <th style={{ padding: "10px" }}>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {stats.recentOrders.map((order) => (
                    <tr
                      key={order._id}
                      style={{
                        borderTop: "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      <td style={{ padding: "12px" }}>
                        {order.customerName}
                      </td>
                      <td style={{ padding: "12px" }}>
                        {order.productTitle}
                      </td>
                      <td style={{ padding: "12px", color: "#22c55e" }}>
                        ₹{order.amount}
                      </td>
                      <td style={{ padding: "12px" }}>
                        <span
                          style={{
                            padding: "4px 10px",
                            borderRadius: "999px",
                            fontSize: "12px",
                            background:
                              order.status === "completed"
                                ? "#14532d"
                                : order.status === "pending"
                                ? "#7c2d12"
                                : "#1e293b",
                            color: "#fff",
                          }}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default DashboardPage;
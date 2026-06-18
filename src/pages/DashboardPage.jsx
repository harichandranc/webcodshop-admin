import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import { getDashboardStats } from "../services/dashboardService";
import "../styles/dashboard.css";

function StatCard({
  title,
  value,
  icon,
  color,
}) {
  return (
    <div className="stat-card">
      <div>
        <div className="stat-title">
          {title}
        </div>

        <div className="stat-value">
          {value}
        </div>
      </div>

      <div
        className={`stat-icon ${color}`}
      >
        {icon}
      </div>
    </div>
  );
}

function DashboardPage() {
  const [stats, setStats] =
    useState({
      totalProducts: 0,
      featuredProducts: 0,
      totalCategories: 0,
      completedOrders: 0,
      completedRevenue: 0,
      recentOrders: [],
    });

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data =
        await getDashboardStats();

      setStats(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="dashboard-container">

        <div className="dashboard-header">
          <h1 className="dashboard-title">
            Dashboard
          </h1>

          <p className="dashboard-subtitle">
            Overview of your store
            performance
          </p>
        </div>

        <div className="stats-grid">

          <StatCard
            title="Total Products"
            value={
              loading
                ? "..."
                : stats.totalProducts
            }
            icon="📦"
            color="bg-blue"
          />

          <StatCard
            title="Featured Products"
            value={
              loading
                ? "..."
                : stats.featuredProducts
            }
            icon="⭐"
            color="bg-yellow"
          />

          <StatCard
            title="Categories"
            value={
              loading
                ? "..."
                : stats.totalCategories
            }
            icon="📂"
            color="bg-purple"
          />

          <StatCard
            title="Completed Orders"
            value={
              loading
                ? "..."
                : stats.completedOrders
            }
            icon="🧾"
            color="bg-green"
          />

          <StatCard
            title="Completed Revenue"
            value={
              loading
                ? "..."
                : `₹${stats.completedRevenue}`
            }
            icon="💰"
            color="bg-green"
          />

        </div>

        <div className="recent-panel">
          <h2 className="recent-title">
            Recent Orders
          </h2>

          {stats.recentOrders
            ?.length === 0 ? (
            <p
              style={{
                color: "#94a3b8",
              }}
            >
              No recent orders.
            </p>
          ) : (
            <div
              style={{
                overflowX: "auto",
              }}
            >
              <table>
                <thead>
                  <tr>
                    <th>
                      Customer
                    </th>
                    <th>
                      Product
                    </th>
                    <th>
                      Amount
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {stats.recentOrders.map(
                    (order) => (
                      <tr
                        key={
                          order._id
                        }
                      >
                        <td>
                          {
                            order.customerName
                          }
                        </td>

                        <td>
                          {
                            order.productTitle
                          }
                        </td>

                        <td
                          style={{
                            color:
                              "#22c55e",
                          }}
                        >
                          ₹
                          {
                            order.amount
                          }
                        </td>
                      </tr>
                    )
                  )}
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
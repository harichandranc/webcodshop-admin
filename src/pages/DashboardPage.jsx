import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import { getDashboardStats } from "../services/dashboardService";

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
      <h1>Dashboard</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>Total Products</h3>
          <h2>
            {loading
              ? "..."
              : stats.totalProducts}
          </h2>
        </div>

        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>Active Products</h3>
          <h2>
            {loading
              ? "..."
              : stats.activeProducts}
          </h2>
        </div>

        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>Inactive Products</h3>
          <h2>
            {loading
              ? "..."
              : stats.inactiveProducts}
          </h2>
        </div>

        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>Featured Products</h3>
          <h2>
            {loading
              ? "..."
              : stats.featuredProducts}
          </h2>
        </div>

        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>Categories</h3>
          <h2>
            {loading
              ? "..."
              : stats.totalCategories}
          </h2>
        </div>

        <div
  style={{
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
  }}
>
  <h3>Total Orders</h3>
  <h2>
    {loading
      ? "..."
      : stats.totalOrders}
  </h2>
</div>

<div
  style={{
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
  }}
>
  <h3>Pending Orders</h3>
  <h2>
    {loading
      ? "..."
      : stats.pendingOrders}
  </h2>
</div>

<div
  style={{
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
  }}
>
  <h3>Paid Orders</h3>
  <h2>
    {loading
      ? "..."
      : stats.paidOrders}
  </h2>
</div>

<div
  style={{
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
  }}
>
  <h3>Completed Orders</h3>
  <h2>
    {loading
      ? "..."
      : stats.completedOrders}
  </h2>
</div>

<div
  style={{
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
  }}
>
  <h3>Total Revenue</h3>
  <h2>
    ₹
    {loading
      ? "..."
      : stats.totalRevenue}
  </h2>
</div>

<div
  style={{
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
  }}
>
  <h3>Completed Revenue</h3>
  <h2>
    ₹
    {loading
      ? "..."
      : stats.completedRevenue}
  </h2>
</div>

<div
  style={{
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    marginTop: "20px",
  }}
>
  <h2>Recent Orders</h2>

  <table
    style={{
      width: "100%",
      marginTop: "15px",
      borderCollapse: "collapse",
    }}
  >
    <thead>
      <tr>
        <th>Name</th>
        <th>Product</th>
        <th>Amount</th>
        <th>Status</th>
      </tr>
    </thead>

    <tbody>
      {stats.recentOrders?.map(
        (order) => (
          <tr key={order._id}>
            <td>
              {order.customerName}
            </td>

            <td>
              {order.productTitle}
            </td>

            <td>
              ₹{order.amount}
            </td>

            <td>
              {order.status}
            </td>
          </tr>
        )
      )}
    </tbody>
  </table>
</div>
      </div>
    </AdminLayout>
  );
}

export default DashboardPage;
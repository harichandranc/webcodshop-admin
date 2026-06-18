import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import "../styles/orders.css";

import {
  getOrders,
  downloadInvoice,
} from "../api/orderApi";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, status) => {
    try {
      await updateOrderStatus(orderId, status);
      await fetchOrders();
    } catch (error) {
      console.error(error);
      alert("Failed to update order");
    }
  };

  return (
    <AdminLayout>
      <div className="orders-page">

        {/* HEADER */}
        <div className="orders-header">
          <h1>Orders</h1>
        </div>

        {/* STATES */}
        {loading && <p className="muted">Loading orders...</p>}

        {!loading && orders.length === 0 && (
          <p className="muted">No orders found.</p>
        )}

        {/* TABLE */}
        {!loading && orders.length > 0 && (
          <div className="table-card">
            <table className="table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Email</th>
                  <th>Product</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Invoice</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order.customerName}</td>

                    <td className="muted">
                      {order.customerEmail}
                    </td>

                    <td>{order.productTitle}</td>

                    <td className="highlight">
                      ₹{order.amount}
                    </td>

                    <td>
                      <span className={`badge ${order.status}`}>
                        {order.status}
                      </span>
                    </td>
                    
                    <td>
                      {order.invoicePath ? (
                        <button
                          onClick={() =>
                            downloadInvoice(
                              order._id
                            )  
                          }
                        >
                          Download Invoive 
                        </button>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </AdminLayout>
  );
}

export default OrdersPage;
import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import "../styles/customers.css";

import { getCustomers } from "../api/customerApi";

function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const data = await getCustomers();
      setCustomers(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load customers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <AdminLayout>
      <div className="customers-page">

        {/* HEADER */}
        <div className="customers-header">
          <h1>Customers</h1>
        </div>

        {/* STATES */}
        {loading && <p className="muted">Loading customers...</p>}

        {!loading && customers.length === 0 && (
          <p className="muted">No customers found.</p>
        )}

        {/* TABLE */}
        {!loading && customers.length > 0 && (
          <div className="table-card">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Orders</th>
                  <th>Total Spend</th>
                  <th>Last Order</th>
                </tr>
              </thead>

              <tbody>
                {customers.map((customer) => (
                  <tr key={customer._id}>
                    <td>{customer.customerName}</td>

                    <td className="muted">
                      {customer.customerEmail}
                    </td>

                    <td>
                      <span className="badge info">
                        {customer.totalOrders}
                      </span>
                    </td>

                    <td className="highlight">
                      ₹{customer.totalSpend}
                    </td>

                    <td className="muted">
                      {customer.lastOrderDate
                        ? new Date(
                            customer.lastOrderDate
                          ).toLocaleDateString()
                        : "-"}
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

export default CustomersPage;
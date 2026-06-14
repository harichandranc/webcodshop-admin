import { useEffect, useState } from "react";

import AdminLayout from "../layouts/AdminLayout";

import {
  getCustomers,
} from "../api/customerApi";

function CustomersPage() {
  const [customers, setCustomers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const fetchCustomers =
    async () => {
      try {
        setLoading(true);

        const data =
          await getCustomers();

        setCustomers(data);
      } catch (error) {
        console.error(error);

        alert(
          "Failed to load customers"
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <AdminLayout>
      <h1>Customers</h1>

      {loading && (
        <p>Loading customers...</p>
      )}

      {!loading &&
        customers.length === 0 && (
          <p>No customers found.</p>
        )}

      {!loading &&
        customers.length > 0 && (
          <div
            style={{
              background: "#fff",
              borderRadius: "10px",
              overflow: "hidden",
              marginTop: "20px",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse:
                  "collapse",
              }}
            >
              <thead>
                <tr
                  style={{
                    background:
                      "#f3f4f6",
                  }}
                >
                  <th
                    style={{
                      padding: "12px",
                      textAlign:
                        "left",
                    }}
                  >
                    Name
                  </th>

                  <th
                    style={{
                      padding: "12px",
                      textAlign:
                        "left",
                    }}
                  >
                    Email
                  </th>

                  <th
                    style={{
                      padding: "12px",
                      textAlign:
                        "left",
                    }}
                  >
                    Orders
                  </th>

                  <th
                    style={{
                      padding: "12px",
                      textAlign:
                        "left",
                    }}
                  >
                    Total Spend
                  </th>

                  <th
                    style={{
                      padding: "12px",
                      textAlign:
                        "left",
                    }}
                  >
                    Last Order
                  </th>
                </tr>
              </thead>

              <tbody>
                {customers.map(
                  (customer) => (
                    <tr
                      key={
                        customer._id
                      }
                    >
                      <td
                        style={{
                          padding:
                            "12px",
                        }}
                      >
                        {
                          customer.customerName
                        }
                      </td>

                      <td
                        style={{
                          padding:
                            "12px",
                        }}
                      >
                        {
                          customer.customerEmail
                        }
                      </td>

                      <td
                        style={{
                          padding:
                            "12px",
                        }}
                      >
                        {
                          customer.totalOrders
                        }
                      </td>

                      <td
                        style={{
                          padding:
                            "12px",
                        }}
                      >
                        ₹
                        {
                          customer.totalSpend
                        }
                      </td>

                      <td
                        style={{
                          padding:
                            "12px",
                        }}
                      >
                        {new Date(
                          customer.lastOrderDate
                        ).toLocaleDateString()}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
    </AdminLayout>
  );
}

export default CustomersPage;
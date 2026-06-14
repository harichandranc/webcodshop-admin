import { useEffect, useState } from "react";

import AdminLayout from "../layouts/AdminLayout";

import {
  getOrders,
  updateOrderStatus,
} from "../api/orderApi";

function OrdersPage() {
  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const data =
        await getOrders();

      setOrders(data);
    } catch (error) {
      console.error(error);

      alert(
        "Failed to load orders"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange =
    async (
      orderId,
      status
    ) => {
      try {
        await updateOrderStatus(
          orderId,
          status
        );

        await fetchOrders();
      } catch (error) {
        console.error(error);

        alert(
          "Failed to update order"
        );
      }
    };

  return (
    <AdminLayout>
      <h1>Orders</h1>

      {loading && (
        <p>Loading orders...</p>
      )}

      {!loading &&
        orders.length === 0 && (
          <p>No orders found.</p>
        )}

      {!loading &&
        orders.length > 0 && (
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
                      padding:
                        "12px",
                      textAlign:
                        "left",
                    }}
                  >
                    Customer
                  </th>

                  <th
                    style={{
                      padding:
                        "12px",
                      textAlign:
                        "left",
                    }}
                  >
                    Email
                  </th>

                  <th
                    style={{
                      padding:
                        "12px",
                      textAlign:
                        "left",
                    }}
                  >
                    Product
                  </th>

                  <th
                    style={{
                      padding:
                        "12px",
                      textAlign:
                        "left",
                    }}
                  >
                    Amount
                  </th>

                  <th
                    style={{
                      padding:
                        "12px",
                      textAlign:
                        "left",
                    }}
                  >
                    Status
                  </th>

                  <th
                    style={{
                      padding:
                        "12px",
                      textAlign:
                        "left",
                    }}
                  >
                    Update
                  </th>
                </tr>
              </thead>

              <tbody>
                {orders.map(
                  (order) => (
                    <tr
                      key={
                        order._id
                      }
                    >
                      <td
                        style={{
                          padding:
                            "12px",
                        }}
                      >
                        {
                          order.customerName
                        }
                      </td>

                      <td
                        style={{
                          padding:
                            "12px",
                        }}
                      >
                        {
                          order.customerEmail
                        }
                      </td>

                      <td
                        style={{
                          padding:
                            "12px",
                        }}
                      >
                        {
                          order.productTitle
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
                          order.amount
                        }
                      </td>

                      <td
                        style={{
                          padding:
                            "12px",
                        }}
                      >
                        <span
                          style={{
                            background:
                              order.status ===
                              "completed"
                                ? "#dcfce7"
                                : order.status ===
                                  "paid"
                                ? "#dbeafe"
                                : order.status ===
                                  "cancelled"
                                ? "#fee2e2"
                                : "#fef3c7",

                            color:
                              "#111827",

                            padding:
                              "4px 10px",

                            borderRadius:
                              "999px",

                            fontSize:
                              "12px",

                            fontWeight:
                              "600",
                          }}
                        >
                          {
                            order.status
                          }
                        </span>
                      </td>

                      <td
                        style={{
                          padding:
                            "12px",
                        }}
                      >
                        <select
                          value={
                            order.status
                          }
                          onChange={(
                            e
                          ) =>
                            handleStatusChange(
                              order._id,
                              e.target
                                .value
                            )
                          }
                        >
                          <option value="pending">
                            Pending
                          </option>

                          <option value="paid">
                            Paid
                          </option>

                          <option value="completed">
                            Completed
                          </option>

                          <option value="cancelled">
                            Cancelled
                          </option>
                        </select>
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

export default OrdersPage;
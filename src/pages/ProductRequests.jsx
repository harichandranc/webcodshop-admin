import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import "../styles/product-requests.css";

import {
  getProductRequests,
  deleteProductRequest,
} from "../api/productRequestApi";

function ProductRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedRequest, setSelectedRequest] =
    useState(null);

  const fetchRequests = async () => {
    try {
      setLoading(true);

      const data =
        await getProductRequests();

      setRequests(data);
    } catch (error) {
      console.error(error);

      alert(
        "Failed to load product requests."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete =
      window.confirm(
        "Delete this product request?"
      );

    if (!confirmDelete) return;

    try {
      await deleteProductRequest(id);

      await fetchRequests();
    } catch (error) {
      console.error(error);

      alert(
        "Failed to delete request."
      );
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString(
      "en-IN",
      {
        dateStyle: "medium",
        timeStyle: "short",
      }
    );
  };

  return (
    <AdminLayout>
      <div className="product-requests-page">

        <div className="product-requests-header">
          <h1>Product Requests</h1>
        </div>

        {loading && (
          <p className="loading-text">
            Loading product requests...
          </p>
        )}

        {!loading &&
          requests.length === 0 && (
            <p className="empty-text">
              No product requests found.
            </p>
          )}

        {!loading &&
          requests.length > 0 && (
            <div className="requests-card">

              <table className="requests-table">

                <thead>

                  <tr>

                    <th>
                      Product
                    </th>

                    <th>
                      Category
                    </th>

                    <th>
                      Technology
                    </th>

                    <th>
                      Customer
                    </th>

                    <th>
                      Email
                    </th>

                    <th>
                      Date
                    </th>

                    <th>
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {requests.map(
                    (request) => (

                      <tr
                        key={request._id}
                      >

                        <td className="request-product">
                          {
                            request.productName
                          }
                        </td>

                        <td>
                          {
                            request.category
                          }
                        </td>

                        <td>
                          {request.preferredTechnology ||
                            "-"}
                        </td>

                        <td>
                          {
                            request.customerName
                          }
                        </td>

                        <td className="request-email">
                          {
                            request.customerEmail
                          }
                        </td>

                        <td>
                          {formatDate(
                            request.createdAt
                          )}
                        </td>

                        <td>

                          <div className="action-buttons">

                            <button
                              className="view-btn"
                              onClick={() =>
                                setSelectedRequest(
                                  request
                                )
                              }
                            >
                              View
                            </button>

                            <button
                              className="delete-btn"
                              onClick={() =>
                                handleDelete(
                                  request._id
                                )
                              }
                            >
                              Delete
                            </button>

                          </div>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>
          )}

        {selectedRequest && (
                      <div className="modal-overlay">

            <div className="request-modal">

              <div className="request-header">

                <h2>
                  Product Request
                </h2>

                <button
                  className="close-btn"
                  onClick={() =>
                    setSelectedRequest(
                      null
                    )
                  }
                >
                  ✕
                </button>

              </div>

              <div className="request-body">

                <div className="request-item">
                  <h4>
                    Product Name
                  </h4>

                  <p>
                    {
                      selectedRequest.productName
                    }
                  </p>
                </div>

                <div className="request-item">
                  <h4>
                    Category
                  </h4>

                  <p>
                    {
                      selectedRequest.category
                    }
                  </p>
                </div>

                <div className="request-item">
                  <h4>
                    Preferred Technology
                  </h4>

                  <p>
                    {selectedRequest.preferredTechnology ||
                      "Not specified"}
                  </p>
                </div>

                <div className="request-item">
                  <h4>
                    Description
                  </h4>

                  <p>
                    {
                      selectedRequest.description
                    }
                  </p>
                </div>

                <div className="request-item">
                  <h4>
                    Customer Name
                  </h4>

                  <p>
                    {
                      selectedRequest.customerName
                    }
                  </p>
                </div>

                <div className="request-item">
                  <h4>
                    Customer Email
                  </h4>

                  <p>
                    {
                      selectedRequest.customerEmail
                    }
                  </p>
                </div>

                <div className="request-item">
                  <h4>
                    Requested On
                  </h4>

                  <p>
                    {formatDate(
                      selectedRequest.createdAt
                    )}
                  </p>
                </div>

              </div>

            </div>

          </div>
        )}

      </div>
    </AdminLayout>
  );
}

export default ProductRequests;
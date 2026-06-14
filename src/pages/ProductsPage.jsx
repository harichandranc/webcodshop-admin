import { useEffect, useState } from "react";
import "../styles/products.css";

import AdminLayout from "../layouts/AdminLayout";
import ProductForm from "../components/ProductForm";
import { getCategories } from "../api/categoryApi";

import {
  getProducts,
  createProduct,
  uploadImage,
  uploadDownloadFile,
  updateProduct,
  deleteProduct,
} from "../api/productApi";

import "../styles/products.css";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] =
    useState(false);

  const [creating, setCreating] =
    useState(false);

  const [editingProduct, setEditingProduct] =
    useState(null);

  const [editing, setEditing] =
    useState(false);

  const [showEditModal, setShowEditModal] =
    useState(false);
  
  const [categories, setCategories] =
    useState([]);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const data =
        await getProducts();

      setProducts(data);
    } catch (error) {
      console.error(error);

      alert("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data =
        await getCategories();

      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateProduct =
    async (data) => {
      try {
        setCreating(true);

        let imageUrl = "";
        let downloadFile = "";

        if (data.imageFile) {
          const uploadRes =
            await uploadImage(
              data.imageFile
            );

          imageUrl =
            uploadRes.imageUrl;
        }

        if (data.downloadUpload) {
          const uploadRes =
            await uploadDownloadFile(
              data.downloadUpload
            );

          downloadFile =
            uploadRes.fileUrl;
        }

        await createProduct({
          title: data.title,
          image: imageUrl,
          category: data.category,
          price: Number(data.price),
          description: data.description,
          previewUrl: data.previewUrl,
          downloadFile,
          type: data.type,
          isFeatured: data.isFeatured,
          isActive: data.isActive,
       });

        await fetchProducts();

        setShowModal(false);
      } catch (error) {
        console.error(error);

        alert(
          "Failed to create product"
        );
      } finally {
        setCreating(false);
      }
    };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleUpdateProduct =
  async (data) => {
    try {
      setEditing(true);

      let imageUrl =
        editingProduct.image || "";

      let downloadFile =
        editingProduct.downloadFile || "";

      if (data.imageFile) {
        const uploadRes =
          await uploadImage(
            data.imageFile
          );

        imageUrl =
          uploadRes.imageUrl;
      }

      if (data.downloadUpload) {
        const uploadRes =
          await uploadDownloadFile(
            data.downloadUpload
          );

        downloadFile =
          uploadRes.fileUrl;
    }

      await updateProduct(
        editingProduct._id,
        {
          title: data.title,
          image: imageUrl,
          category: data.category,
          price: Number(data.price),
          description:
            data.description,
          previewUrl:
            data.previewUrl, downloadFile,
          type: data.type,
          isFeatured:
            data.isFeatured,
          isActive:
            data.isActive,
        }
      );

      await fetchProducts();

      setShowEditModal(false);

      setEditingProduct(null);
    } catch (error) {
      console.error(error);

      alert(
        "Failed to update product"
      );
    } finally {
      setEditing(false);
    }
  };

  const handleDeleteProduct =
  async (productId) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this product?"
      );

    if (!confirmed) return;

    try {
      await deleteProduct(
        productId
      );

      await fetchProducts();
    } catch (error) {
      console.error(error);

      alert(
        "Failed to delete product"
      );
    }
  };

  return (
    <AdminLayout>
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1>Products</h1>

        <button
          className="primary-btn"
          onClick={() =>
            setShowModal(true)
          }
        >
          + Add Product
        </button>
      </div>

      {loading && (
        <p>Loading products...</p>
      )}

      {!loading &&
        products.length === 0 && (
          <p>No products found.</p>
        )}

      {!loading &&
        products.length > 0 && (
          <div
            style={{
              background: "#fff",
              borderRadius: "10px",
              overflow: "hidden",
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
                    Title
                  </th>

                  <th
                    style={{
                      padding: "12px",
                      textAlign:
                        "left",
                    }}
                  >
                    Category
                  </th>

                  <th
                    style={{
                      padding: "12px",
                      textAlign:
                        "left",
                    }}
                  >
                    Type
                  </th>

                  <th
                    style={{
                      padding: "12px",
                      textAlign:
                        "left",
                    }}
                  >
                    Price
                  </th>

                  <th
                    style={{
                      padding: "12px",
                      textAlign:
                        "left",
                    }}
                  >
                    Featured
                  </th>

                  <th
                    style={{
                      padding: "12px",
                      textAlign:
                        "left",
                    }}
                  >
                    Status
                  </th>

                  <th
                    style={{
                      padding: "12px",
                    }}
                  >
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {products.map(
                  (product) => (
                    <tr
                      key={
                        product._id
                      }
                    >
                      <td
                        style={{
                          padding:
                            "12px",
                        }}
                      >
                        {
                          product.title
                        }
                      </td>

                      <td
                        style={{
                          padding:
                            "12px",
                        }}
                      >
                        {
                          product.category
                        }
                      </td>

                      <td
                        style={{
                          padding:
                            "12px",
                        }}
                      >
                        {
                          product.type
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
                          product.price
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
        product.isFeatured
          ? "#dcfce7"
          : "#f3f4f6",
      color:
        product.isFeatured
          ? "#166534"
          : "#6b7280",
      padding: "4px 10px",
      borderRadius: "999px",
      fontSize: "12px",
      fontWeight: "600",
    }}
  >
    {product.isFeatured
      ? "Featured"
      : "Normal"}
  </span>
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
        product.isActive
          ? "#dcfce7"
          : "#fee2e2",
      color:
        product.isActive
          ? "#166534"
          : "#991b1b",
      padding: "4px 10px",
      borderRadius: "999px",
      fontSize: "12px",
      fontWeight: "600",
    }}
  >
    {product.isActive
      ? "Active"
      : "Inactive"}
  </span>
</td>

<td
  style={{
    padding:
      "12px",
  }}
>
                        <button
                          className="action-btn edit-btn"
                          onClick={() => {
                            setEditingProduct(product);
                            setShowEditModal(true);
                          }}
                        >
                          Edit
                        </button>

                        {" "}
                        
                        <button
                          className="action-btn delete-btn"
                          onClick={() =>
                            handleDeleteProduct(
                              product._id
                            )
                           }
                        >
                           Delete
                        </button>


                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems:
                  "center",
                marginBottom:
                  "20px",
              }}
            >
              <h3>
                Create Product
              </h3>

              <button
                onClick={() =>
                  setShowModal(
                    false
                  )
                }
              >
                ✕
              </button>
            </div>

            <ProductForm
              loading={creating}
              categories={categories}
              onSubmit={
                handleCreateProduct
              }
            />
          </div>
        </div>
      )}
      {showEditModal && editingProduct && (
  <div className="modal-overlay">
    <div className="modal-content">
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h3>Edit Product</h3>

        <button
          onClick={() => {
            setShowEditModal(
              false
            );

            setEditingProduct(
              null
            );
          }}
        >
          ✕
        </button>
      </div>

      <ProductForm
        loading={editing}
        initialData={
          editingProduct
        }
        categories={categories}
        onSubmit={
          handleUpdateProduct
        }
      />
    </div>
  </div>
)}
    </AdminLayout>
  );
}

export default ProductsPage;
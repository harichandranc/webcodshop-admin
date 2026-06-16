import { useEffect, useState } from "react";

import AdminLayout from "../layouts/AdminLayout";
import ProductForm from "../components/ProductForm";

import "../styles/products.css";

import {
  getCategories,
  getProducts,
  createProduct,
  uploadImage,
  uploadDownloadFile,
  uploadProjectReport,
  updateProduct,
  deleteProduct,
} from "../api/productApi";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
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
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  /* ================= CREATE ================= */
  const handleCreateProduct = async (data) => {
    try {
      setCreating(true);

      let images = [];
      let downloadFile = "";
      let projectReport = "";

      if (data.imageFiles?.length) {
        for (const file of data.imageFiles) {
          const res = await uploadImage(file);
          images.push(res.imageUrl);
        }
      }

      if (data.downloadUpload) {
        const res = await uploadDownloadFile(data.downloadUpload);
        downloadFile = res.fileUrl;
      }

      if (data.projectReportUpload) {
        const res = await uploadProjectReport(data.projectReportUpload);
        projectReport = res.fileUrl;
      }

      await createProduct({
        ...data,
        images,
        downloadFile,
        projectReport,
        price: Number(data.price),
      });

      await fetchProducts();
      setShowModal(false);
    } catch (error) {
      console.error(error);
      alert("Failed to create product");
    } finally {
      setCreating(false);
    }
  };

  /* ================= UPDATE ================= */
  const handleUpdateProduct = async (data) => {
    try {
      setEditing(true);

      let images = editingProduct.images || [];
      let downloadFile = editingProduct.downloadFile || "";
      let projectReport = editingProduct.projectReport || "";

      if (data.imageFiles?.length) {
        images = [];
        for (const file of data.imageFiles) {
          const res = await uploadImage(file);
          images.push(res.imageUrl);
        }
      }

      if (data.downloadUpload) {
        const res = await uploadDownloadFile(data.downloadUpload);
        downloadFile = res.fileUrl;
      }

      if (data.projectReportUpload) {
        const res = await uploadProjectReport(data.projectReportUpload);
        projectReport = res.fileUrl;
      }

      await updateProduct(editingProduct._id, {
        ...data,
        images,
        downloadFile,
        projectReport,
        price: Number(data.price),
      });

      await fetchProducts();

      setShowEditModal(false);
      setEditingProduct(null);
    } catch (error) {
      console.error(error);
      alert("Failed to update product");
    } finally {
      setEditing(false);
    }
  };

  /* ================= DELETE ================= */
  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await deleteProduct(id);
      await fetchProducts();
    } catch (error) {
      console.error(error);
      alert("Failed to delete product");
    }
  };

  return (
    <AdminLayout>
      <div className="products-page">

        {/* HEADER */}
        <div className="products-header">
          <h1>Products</h1>

          <button className="primary-btn" onClick={() => setShowModal(true)}>
            + Add Product
          </button>
        </div>

        {/* STATES */}
        {loading && <p className="muted">Loading products...</p>}

        {!loading && products.length === 0 && (
          <p className="muted">No products found.</p>
        )}

        {/* TABLE */}
        {!loading && products.length > 0 && (
          <div className="table-card">
            <table className="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Featured</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map((p) => (
                  <tr key={p._id}>
                    <td>{p.title}</td>

                    <td className="muted">
                      {p.category}
                    </td>

                    <td className="highlight">
                      ₹{p.price}
                    </td>

                    <td>
                      <span
                        className={`badge ${
                          p.isFeatured ? "active" : "inactive"
                        }`}
                      >
                        {p.isFeatured ? "Featured" : "Normal"}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`badge ${
                          p.isActive ? "active" : "inactive"
                        }`}
                      >
                        {p.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td>
                      <button
                        className="btn edit"
                        onClick={() => {
                          setEditingProduct(p);
                          setShowEditModal(true);
                        }}
                      >
                        Edit
                      </button>

                      <button
                        className="btn delete"
                        onClick={() => handleDeleteProduct(p._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* CREATE MODAL */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h3>Create Product</h3>
                <button onClick={() => setShowModal(false)}>✕</button>
              </div>

              <ProductForm
                loading={creating}
                categories={categories}
                onSubmit={handleCreateProduct}
              />
            </div>
          </div>
        )}

        {/* EDIT MODAL */}
        {showEditModal && editingProduct && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h3>Edit Product</h3>
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingProduct(null);
                  }}
                >
                  ✕
                </button>
              </div>

              <ProductForm
                loading={editing}
                initialData={editingProduct}
                categories={categories}
                onSubmit={handleUpdateProduct}
              />
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
}

export default ProductsPage;
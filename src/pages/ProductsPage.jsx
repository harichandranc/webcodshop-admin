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
  uploadProjectReport,
  uploadSetupGuide,
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

      let images = [];
      let thumbnailImage = ""
      let downloadFile = "";
      let projectReport = "";
      let setupGuide = "";

      if (data.thumbnailFile) {
        const uploadRes =
          await uploadImage(
            data.thumbnailFile
        );

        thumbnailImage =
          uploadRes.imageUrl;
      }

      if (
        data.imageFiles &&
        data.imageFiles.length > 0
      ) {
        for (const file of data.imageFiles) {
          const uploadRes =
            await uploadImage(file);

          images.push(
            uploadRes.imageUrl
          );
        }
      }

      if (data.downloadUpload) {
        const uploadRes =
          await uploadDownloadFile(
            data.downloadUpload
          );

        downloadFile =
          uploadRes.fileUrl;
      }

      if (
        data.projectReportUpload
      ) {
        const uploadRes =
          await uploadProjectReport(
            data.projectReportUpload
          );

        projectReport =
          uploadRes.fileUrl;
      }

      if (
        data.setupGuideUpload
      ) {
        const uploadRes =
          await uploadSetupGuide(
            data.setupGuideUpload
          );

        setupGuide =
          uploadRes.fileUrl;
      }

      await createProduct({
        title: data.title,

        images,

        thumbnailImage,

        category:
          data.category,

        price: Number(
          data.price
        ),

        description:
          data.description,

        downloadFile,

        setupGuidePdf,

        projectReport,

        isFeatured:
          data.isFeatured,

        isActive:
          data.isActive,
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

      let images =
        editingProduct.images || [];

      let thumbnailImage =
        editingProduct.thumbnailImage|| "";

      let downloadFile =
        editingProduct.downloadFile || "";

      let projectReport =
        editingProduct.projectReport || "";

      let setupGuidePdf =
        editingProduct.setupGuidePdf || "";

      if (data.thumbnailFile) {
        const uploadRes =
          await uploadImage(
            data.thumbnailFile
        );

        thumbnailImage =
          uploadRes.imageUrl;
      }

      if (
        data.imageFiles &&
        data.imageFiles.length > 0
      ) {
        images = [];

        for (const file of data.imageFiles) {
          const uploadRes =
            await uploadImage(file);

          images.push(
            uploadRes.imageUrl
          );
        }
      }

      if (data.downloadUpload) {
        const uploadRes =
          await uploadDownloadFile(
            data.downloadUpload
          );

        downloadFile =
          uploadRes.fileUrl;
      }

      if (
        data.projectReportUpload
      ) {
        const uploadRes =
          await uploadProjectReport(
            data.projectReportUpload
          );

        projectReport =
          uploadRes.fileUrl;
      }

      if (
        data.setupGuideUpload
      ) {
        const uploadRes =
          await uploadSetupGuide(
            data.setupGuideUpload
          );

        setupGuidePdf =
          uploadRes.fileUrl;
      }

      await updateProduct(
        editingProduct._id,
        {
          title: data.title,

          images,

          thumbnailImage,

          category:
            data.category,

          price: Number(
            data.price
          ),

          description:
            data.description,


          downloadFile,

          projectReport,

          setupGuidePdf,

          setupGuide:
            data.setupGuide,

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
    <div className="products-page">

      {/* Header */}
      <div className="products-header">
        <h1>Products</h1>

        <button
          className="primary-btn"
          onClick={() => setShowModal(true)}
        >
          + Add Product
        </button>
      </div>

      {loading && (
        <p className="loading-text">
          Loading products...
        </p>
      )}

      {!loading && products.length === 0 && (
        <p className="empty-text">
          No products found.
        </p>
      )}

      {!loading && products.length > 0 && (
        <div className="table-card">
          <table className="products-table">
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
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product.title}</td>

                  <td>{product.category}</td>

                  <td>₹{product.price}</td>

                  <td>
                    <span
                      className={
                        product.isFeatured
                          ? "badge badge-blue"
                          : "badge"
                      }
                    >
                      {product.isFeatured
                        ? "Featured"
                        : "Normal"}
                    </span>
                  </td>

                  <td>
                    <span
                      className={
                        product.isActive
                          ? "badge badge-green"
                          : "badge badge-red"
                      }
                    >
                      {product.isActive
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </td>

                  <td>
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
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Create Product Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">

            <div className="modal-header">
              <h3>Create Product</h3>

              <button
                className="modal-close"
                onClick={() =>
                  setShowModal(false)
                }
              >
                ✕
              </button>
            </div>

            <ProductForm
              loading={creating}
              categories={categories}
              onSubmit={handleCreateProduct}
            />

          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {showEditModal && editingProduct && (
        <div className="modal-overlay">
          <div className="modal-content">

            <div className="modal-header">
              <h3>Edit Product</h3>

              <button
                className="modal-close"
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
import { useEffect, useState } from "react";
import "../styles/categories.css";

import AdminLayout from "../layouts/AdminLayout";
import CategoryForm from "../components/CategoryForm";

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../api/categoryApi";

function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState(false);

  const [editingCategory, setEditingCategory] = useState(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreateCategory = async (data) => {
    try {
      setCreating(true);
      await createCategory(data);
      await fetchCategories();
      setShowModal(false);
    } catch (error) {
      console.error(error);
      alert("Failed to create category");
    } finally {
      setCreating(false);
    }
  };

  const handleUpdateCategory = async (data) => {
    try {
      setEditing(true);
      await updateCategory(editingCategory._id, data);
      await fetchCategories();
      setShowEditModal(false);
      setEditingCategory(null);
    } catch (error) {
      console.error(error);
      alert("Failed to update category");
    } finally {
      setEditing(false);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    try {
      await deleteCategory(id);
      await fetchCategories();
    } catch (error) {
      console.error(error);
      alert("Failed to delete category");
    }
  };

  return (
    <AdminLayout>
      <div className="categories-page">

        {/* HEADER */}
        <div className="categories-header">
          <h1>Categories</h1>

          <button
            className="primary-btn"
            onClick={() => setShowModal(true)}
          >
            + Add Category
          </button>
        </div>

        {/* CONTENT */}
        {loading && <p className="muted">Loading categories...</p>}

        {!loading && categories.length === 0 && (
          <p className="muted">No categories found.</p>
        )}

        {!loading && categories.length > 0 && (
          <div className="table-card">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Slug</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {categories.map((cat) => (
                  <tr key={cat._id}>
                    <td>{cat.name}</td>
                    <td className="muted">{cat.slug}</td>

                    <td>
                      <span
                        className={`badge ${
                          cat.isActive ? "active" : "inactive"
                        }`}
                      >
                        {cat.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td>
                      <button
                        className="btn edit"
                        onClick={() => {
                          setEditingCategory(cat);
                          setShowEditModal(true);
                        }}
                      >
                        Edit
                      </button>

                      <button
                        className="btn delete"
                        onClick={() => handleDeleteCategory(cat._id)}
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
                <h3>Create Category</h3>
                <button onClick={() => setShowModal(false)}>✕</button>
              </div>

              <CategoryForm
                loading={creating}
                onSubmit={handleCreateCategory}
              />
            </div>
          </div>
        )}

        {/* EDIT MODAL */}
        {showEditModal && editingCategory && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h3>Edit Category</h3>
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingCategory(null);
                  }}
                >
                  ✕
                </button>
              </div>

              <CategoryForm
                loading={editing}
                initialData={editingCategory}
                onSubmit={handleUpdateCategory}
              />
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
}

export default CategoriesPage;
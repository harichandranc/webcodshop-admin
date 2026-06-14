import { useEffect, useState } from "react";
import "../styles/products.css";

import AdminLayout from "../layouts/AdminLayout";
import CategoryForm from "../components/CategoryForm";

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../api/categoryApi";

function CategoriesPage() {
  const [categories, setCategories] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [showModal, setShowModal] =
    useState(false);

  const [creating, setCreating] =
    useState(false);

  const [editingCategory,
    setEditingCategory] =
    useState(null);

  const [editing, setEditing] =
    useState(false);

  const [showEditModal,
    setShowEditModal] =
    useState(false);

  const fetchCategories =
    async () => {
      try {
        setLoading(true);

        const data =
          await getCategories();

        setCategories(data);
      } catch (error) {
        console.error(error);

        alert(
          "Failed to load categories"
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreateCategory =
    async (data) => {
      try {
        setCreating(true);

        await createCategory(data);

        await fetchCategories();

        setShowModal(false);
      } catch (error) {
        console.error(error);

        alert(
          "Failed to create category"
        );
      } finally {
        setCreating(false);
      }
    };

  const handleUpdateCategory =
    async (data) => {
      try {
        setEditing(true);

        await updateCategory(
          editingCategory._id,
          data
        );

        await fetchCategories();

        setShowEditModal(false);

        setEditingCategory(null);
      } catch (error) {
        console.error(error);

        alert(
          "Failed to update category"
        );
      } finally {
        setEditing(false);
      }
    };

  const handleDeleteCategory =
    async (categoryId) => {
      const confirmed =
        window.confirm(
          "Are you sure you want to delete this category?"
        );

      if (!confirmed) return;

      try {
        await deleteCategory(
          categoryId
        );

        await fetchCategories();
      } catch (error) {
        console.error(error);

        alert(
          "Failed to delete category"
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
        <h1>Categories</h1>

        <button
          className="primary-btn"
          onClick={() =>
            setShowModal(true)
          }
        >
          + Add Category
        </button>
      </div>

      {loading && (
        <p>Loading categories...</p>
      )}

      {!loading &&
        categories.length === 0 && (
          <p>No categories found.</p>
        )}

      {!loading &&
        categories.length > 0 && (
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
                    Name
                  </th>

                  <th
                    style={{
                      padding: "12px",
                      textAlign:
                        "left",
                    }}
                  >
                    Slug
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
                {categories.map(
                  (category) => (
                    <tr
                      key={
                        category._id
                      }
                    >
                      <td
                        style={{
                          padding:
                            "12px",
                        }}
                      >
                        {
                          category.name
                        }
                      </td>

                      <td
                        style={{
                          padding:
                            "12px",
                        }}
                      >
                        {
                          category.slug
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
                              category.isActive
                                ? "#dcfce7"
                                : "#f3f4f6",
                            color:
                              category.isActive
                                ? "#166534"
                                : "#6b7280",
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
                          {category.isActive
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
                            setEditingCategory(
                              category
                            );

                            setShowEditModal(
                              true
                            );
                          }}
                        >
                          Edit
                        </button>

                        {" "}

                        <button
                          className="action-btn delete-btn"
                          onClick={() =>
                            handleDeleteCategory(
                              category._id
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
                Create Category
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

            <CategoryForm
              loading={creating}
              onSubmit={
                handleCreateCategory
              }
            />
          </div>
        </div>
      )}

      {showEditModal &&
        editingCategory && (
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
                  Edit Category
                </h3>

                <button
                  onClick={() => {
                    setShowEditModal(
                      false
                    );

                    setEditingCategory(
                      null
                    );
                  }}
                >
                  ✕
                </button>
              </div>

              <CategoryForm
                loading={editing}
                initialData={
                  editingCategory
                }
                onSubmit={
                  handleUpdateCategory
                }
              />
            </div>
          </div>
        )}
    </AdminLayout>
  );
}

export default CategoriesPage;
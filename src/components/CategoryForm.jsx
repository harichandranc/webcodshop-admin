import { useEffect, useState } from "react";

export default function CategoryForm({
  onSubmit,
  loading,
  initialData = null,
}) {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    image: "",
    isActive: true,
  });

  useEffect(() => {
    if (!initialData) return;

    setFormData({
      name: initialData.name || "",
      slug: initialData.slug || "",
      description:
        initialData.description || "",
      image: initialData.image || "",
      isActive:
        initialData.isActive ?? true,
    });
  }, [initialData]);

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Slug</label>

        <input
          type="text"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Description</label>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Image URL</label>

        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>
          <input
            type="checkbox"
            name="isActive"
            checked={
              formData.isActive
            }
            onChange={handleChange}
          />
          Active Category
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="form-submit-btn"
      >
        {loading
          ? initialData
            ? "Updating..."
            : "Creating..."
          : initialData
          ? "Update Category"
          : "Create Category"}
      </button>
    </form>
  );
}
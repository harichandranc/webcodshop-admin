import { useEffect, useState } from "react";

export default function ProductForm({
  onSubmit,
  loading,
  initialData = null,
  categories = [],
}) {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    category: "",
    price: "",
    description: "",
    previewUrl: "",
    type: "template",
    isFeatured: false,
    isActive: true,
  });

  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (!initialData) return;

    setFormData({
      title: initialData.title || "",
      image: initialData.image || "",
      category: initialData.category || "",
      price: initialData.price || "",
      description: initialData.description || "",
      previewUrl: initialData.previewUrl || "",
      type: initialData.type || "template",
      isFeatured: initialData.isFeatured || false,
      isActive: initialData.isActive ?? true,
    });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

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

    onSubmit({
      ...formData,
      imageFile,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title</label>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Category</label>

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
        <option value="">
          Select Category
        </option>

        {categories.map((category) => (
          <option
            key={category._id}
            value={category.name}
          >
            {category.name}
          </option>
        ))}
      </select>
    </div>

      <div className="form-group">
        <label>Price</label>

        <input
          type="number"
          name="price"
          value={formData.price}
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
        <label>Preview URL</label>

        <input
          type="text"
          name="previewUrl"
          value={formData.previewUrl}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Type</label>

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
        >
          <option value="template">
            Template
          </option>

          <option value="sourceCode">
            Source Code
          </option>
        </select>
      </div>

      <div className="form-group">
        <label>Image</label>

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setImageFile(
              e.target.files[0]
            )
          }
        />

        {initialData?.image && (
          <p
            style={{
              marginTop: "8px",
              fontSize: "14px",
            }}
          >
            Current Image:
            {" "}
            {initialData.image}
          </p>
        )}
      </div>

      <div className="form-group">
        <label>
          <input
            type="checkbox"
            name="isFeatured"
            checked={
              formData.isFeatured
            }
            onChange={handleChange}
          />
          Featured Product
        </label>
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
           Active Product
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
          ? "Update Product"
          : "Create Product"}
      </button>
    </form>
  );
}
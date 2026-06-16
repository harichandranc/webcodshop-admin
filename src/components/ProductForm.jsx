import { useEffect, useState } from "react";
import "../styles/product-form.css";

export default function ProductForm({
  onSubmit,
  loading,
  initialData = null,
  categories = [],
}) {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    description: "",
    previewUrl: "",
    setupGuide: "",
    isFeatured: false,
    isActive: true,
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [downloadUpload, setDownloadUpload] = useState(null);
  const [projectReportUpload, setProjectReportUpload] = useState(null);

  useEffect(() => {
    if (!initialData) return;

    setFormData({
      title: initialData.title || "",
      category: initialData.category || "",
      price: initialData.price || "",
      description: initialData.description || "",
      previewUrl: initialData.previewUrl || "",
      setupGuide: initialData.setupGuide || "",
      isFeatured: initialData.isFeatured || false,
      isActive: initialData.isActive ?? true,
    });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...formData,
      imageFiles,
      downloadUpload,
      projectReportUpload,
    });
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>

      {/* GRID */}
      <div className="form-grid">

        <div className="input-group">
          <label>Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Product title"
            required
          />
        </div>

        <div className="input-group">
          <label>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c._id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="₹0"
            required
          />
        </div>

        <div className="input-group">
          <label>Preview URL</label>
          <input
            name="previewUrl"
            value={formData.previewUrl}
            onChange={handleChange}
            placeholder="https://..."
          />
        </div>

        <div className="input-group full">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Product description"
          />
        </div>

        <div className="input-group full">
          <label>Setup Guide</label>
          <textarea
            name="setupGuide"
            value={formData.setupGuide}
            onChange={handleChange}
            placeholder="Installation / setup steps"
          />
        </div>

        {/* FILES */}
        <div className="input-group">
          <label>Product Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) =>
              setImageFiles(Array.from(e.target.files))
            }
          />
        </div>

        <div className="input-group">
          <label>Download File</label>
          <input
            type="file"
            accept=".zip,.rar,.7z,.pdf"
            onChange={(e) => setDownloadUpload(e.target.files[0])}
          />
        </div>

        <div className="input-group">
          <label>Project Report</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) =>
              setProjectReportUpload(e.target.files[0])
            }
          />
        </div>

      </div>

      {/* CHECKBOXES */}
      <div className="checkbox-row">
        <label>
          <input
            type="checkbox"
            name="isFeatured"
            checked={formData.isFeatured}
            onChange={handleChange}
          />
          Featured Product
        </label>

        <label>
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
          />
          Active Product
        </label>
      </div>

      {/* SUBMIT */}
      <button className="submit-btn" type="submit" disabled={loading}>
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
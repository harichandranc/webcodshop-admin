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
    downloadFile: "",
    projectReport: "",
    setupGuide: "",
    isFeatured: false,
    isActive: true,
  });

  const [thumbnailFile, setThumbnailFile] = useState(null);
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
      downloadFile: initialData.downloadFile || "",
      projectReport: initialData.projectReport || "",
      setupGuide: initialData.setupGuide || "",
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
      thumbnailFile,
      imageFiles,
      downloadUpload,
      projectReportUpload,
    });
  };

  return (
    <form
      className="product-form"
      onSubmit={handleSubmit}
    >
      <div className="product-grid">
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
          <label>Preview Video URL</label>

          <input
            type="text"
            name="previewUrl"
            value={formData.previewUrl}
            onChange={handleChange}
          />
        </div>

        <div className="form-group full-width">
          <label>Description</label>

          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-group full-width">
          <label>Setup Guide</label>

          <textarea
            name="setupGuide"
            rows="4"
            value={formData.setupGuide}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Download File</label>

          <input
            type="file"
            accept=".zip,.rar,.7z,.pdf"
            onChange={(e) =>
              setDownloadUpload(
                e.target.files[0]
              )
            }
          />

          {initialData?.downloadFile && (
            <small>
              Current file available
            </small>
          )}
        </div>

        {formData.category ===
          "College Projects" && (
          <div className="form-group">
            <label>Project Report</label>

            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) =>
                setProjectReportUpload(
                  e.target.files[0]
                )
              }
            />

            {initialData?.projectReport && (
              <small>
                Current report available
              </small>
            )}
          </div>
        )}

        <div className="form-group">
          <label>Thumbnail Image</label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setThumbnailFile(
                e.target.files[0]
              )
            }
          />

          {thumbnailFile && (
            <img
              src={URL.createObjectURL(
                thumbnailFile
              )}
              alt="thumbnail"
              className="preview-image"
            />
          )}
        </div>

        <div className="form-group">
          <label>Product Images</label>

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) =>
              setImageFiles(
                Array.from(
                  e.target.files
                )
              )
            }
          />

          {imageFiles.length > 0 && (
            <small>
              {imageFiles.length} image(s)
              selected
            </small>
          )}
        </div>
      </div>

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

      <button
        type="submit"
        disabled={loading}
        className="submit-btn"
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
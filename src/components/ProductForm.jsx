import { useEffect, useMemo, useState } from "react";
import "../styles/product-form.css";

const API_URL = "https://api.webcodshop.chtechgiant.com";

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
    downloadFile: "",
    projectReport: "",
    setupGuidePdf: "",
    isFeatured: false,
    isActive: true,
  });

  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  const [downloadUpload, setDownloadUpload] = useState(null);
  const [projectReportUpload, setProjectReportUpload] = useState(null);
  const [setupGuideUpload, setSetupGuideUpload] = useState(null);

  useEffect(() => {
    if (!initialData) return;

    setFormData({
      title: initialData.title || "",
      category: initialData.category || "",
      price: initialData.price || "",
      description: initialData.description || "",
      downloadFile: initialData.downloadFile || "",
      projectReport: initialData.projectReport || "",
      setupGuidePdf: initialData.setupGuidePdf || "",
      isFeatured: initialData.isFeatured || false,
      isActive: initialData.isActive ?? true,
    });

    setExistingImages(initialData.images || []);
    setThumbnailFile(null);
    setImageFiles([]);
  }, [initialData]);

  const thumbnailPreview = useMemo(() => {
  if (thumbnailFile) {
    return URL.createObjectURL(thumbnailFile);
  }

  if (!initialData?.thumbnailImage) {
    return "";
  }

  return initialData.thumbnailImage.startsWith("http")
    ? initialData.thumbnailImage
    : `${API_URL}${initialData.thumbnailImage}`;
}, [thumbnailFile, initialData]);

  const newImagePreviews = useMemo(() => {
    return imageFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
  }, [imageFiles]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const removeExistingImage = (index) => {
    setExistingImages((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const removeNewImage = (index) => {
    setImageFiles((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const handleNewImages = (e) => {
    const files = Array.from(e.target.files || []);

    setImageFiles((prev) => [...prev, ...files]);

    e.target.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...formData,
      thumbnailFile,
      imageFiles,
      existingImages,
      downloadUpload,
      projectReportUpload,
      setupGuideUpload,
    });
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
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
            <option value="">Select Category</option>

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

        <div className="form-group full-width">
          <label>Description</label>

          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Setup Guide PDF</label>

          <input
            type="file"
            accept=".pdf"
            onChange={(e) =>
              setSetupGuideUpload(e.target.files[0])
            }
          />

          {initialData?.setupGuidePdf && (
            <small>Current PDF available</small>
          )}
        </div>

        <div className="form-group">
          <label>Download File</label>

          <input
            type="file"
            accept=".zip,.rar,.7z,.pdf"
            onChange={(e) =>
              setDownloadUpload(e.target.files[0])
            }
          />

          {initialData?.downloadFile && (
            <small>Current file available</small>
          )}
        </div>

        {formData.category === "College Project" && (
          <div className="form-group">
            <label>Project Report</label>

            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) =>
                setProjectReportUpload(e.target.files[0])
              }
            />

            {initialData?.projectReport && (
              <small>Current report available</small>
            )}
          </div>
        )}

        <div className="form-group">
          <label>Thumbnail Image</label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setThumbnailFile(e.target.files[0])
            }
          />

          {thumbnailPreview && (
            <img
              src={thumbnailPreview}
              alt="Thumbnail Preview"
              className="preview-image"
            />
          )}
        </div>

        <div className="form-group full-width">
          <label>Product Images</label>

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleNewImages}
          />

          {existingImages.length > 0 && (
            <>
              <small
                style={{
                  display: "block",
                  marginTop: 12,
                  marginBottom: 8,
                  fontWeight: 600,
                }}
              >
                Current Images
              </small>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 12,
                }}
              >
                {existingImages.map((image, index) => (
                  <div
                    key={index}
                    style={{
                      position: "relative",
                      width: 120,
                      height: 120,
                    }}
                  >
                    <img
                      src={
                        image.startsWith("http")
                          ? image
                          : `https://api.webcodshop.chtechgiant.com${image}`
                      }
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: 8,
                        border: "1px solid #333",
                      }}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        removeExistingImage(index)
                      }
                      style={{
                        position: "absolute",
                        top: -8,
                        right: -8,
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        border: "none",
                        cursor: "pointer",
                        background: "#ff3b30",
                        color: "#fff",
                        fontWeight: "bold",
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {newImagePreviews.length > 0 && (
            <>
              <small
                style={{
                  display: "block",
                  marginTop: 20,
                  marginBottom: 8,
                  fontWeight: 600,
                }}
              >
                New Images
              </small>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 12,
                }}
              >
                {newImagePreviews.map(
                  ({ url }, index) => (
                    <div
                      key={index}
                      style={{
                        position: "relative",
                        width: 120,
                        height: 120,
                      }}
                    >
                      <img
                        src={url}
                        alt=""
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: 8,
                          border:
                            "1px solid #333",
                        }}
                      />

                      <button
                        type="button"
                        onClick={() =>
                          removeNewImage(index)
                        }
                        style={{
                          position: "absolute",
                          top: -8,
                          right: -8,
                          width: 24,
                          height: 24,
                          borderRadius: "50%",
                          border: "none",
                          cursor: "pointer",
                          background: "#ff3b30",
                          color: "#fff",
                          fontWeight: "bold",
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  )
                )}
              </div>
            </>
          )}

          {(existingImages.length > 0 ||
            imageFiles.length > 0) && (
            <small
              style={{
                display: "block",
                marginTop: 12,
              }}
            >
              Existing Images: {existingImages.length}
              {" | "}
              New Images: {imageFiles.length}
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
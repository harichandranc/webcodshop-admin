import { useEffect, useState } from "react";

export default function ProductForm({
  onSubmit,
  loading,
  initialData = null,
  categories = [],
}) {
  const [formData, setFormData] =
    useState({
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

  const [imageFiles, setImageFiles] =
    useState([]);
  
  const [thumbnailFile, setThumbnailFile] =
    useState(null);

  const [
    downloadUpload,
    setDownloadUpload,
  ] = useState(null);

  const [
    projectReportUpload,
    setProjectReportUpload,
  ] = useState(null);

  useEffect(() => {
    if (!initialData) return;

    setFormData({
      title:
        initialData.title || "",

      category:
        initialData.category || "",

      price:
        initialData.price || "",

      description:
        initialData.description ||
        "",

      previewUrl:
        initialData.previewUrl ||
        "",

      downloadFile:
        initialData.downloadFile ||
        "",

      projectReport:
        initialData.projectReport ||
        "",

      setupGuide:
        initialData.setupGuide ||
        "",

      isFeatured:
        initialData.isFeatured ||
        false,

      isActive:
        initialData.isActive ??
        true,
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

    onSubmit({
      ...formData,
      thumbnailFile,
      imageFiles,
      thumbnailFile,
      downloadUpload,
      projectReportUpload,
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

          {categories.map(
            (category) => (
              <option
                key={category._id}
                value={
                  category.name
                }
              >
                {category.name}
              </option>
            )
          )}
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
        <label>
          Description
        </label>

        <textarea
          name="description"
          value={
            formData.description
          }
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>
          Setup Guide
        </label>

        <textarea
          name="setupGuide"
          value={
            formData.setupGuide
          }
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>
            Preview Video URL
        </label>

        <input
          type="text"
          name="previewUrl"
          value={
            formData.previewUrl
          }
          onChange={
            handleChange
          }
          />
      </div>
  

      <div className="form-group">
        <label>
          Download File
        </label>

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
          <p
            style={{
              marginTop: "8px",
              fontSize: "14px",
            }}
          >
            Current File:
            {" "}
            {
              initialData.downloadFile
            }
          </p>
        )}
      </div>

      {formData.category ===
        "College Projects" && (
        <div className="form-group">
          <label>
            Project Report
          </label>

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
            <p
              style={{
                marginTop:
                  "8px",
                fontSize:
                  "14px",
              }}
            >
              Current Report:
              {" "}
              {
                initialData.projectReport
              }
            </p>
          )}
        </div>
      )}

      <div className="form-group">
  <label>
    Thumbnail Image
  </label>

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
    <div
      style={{
        marginTop: "10px",
      }}
    >
      <img
        src={URL.createObjectURL(
          thumbnailFile
        )}
        alt=""
        width="140"
        style={{
          borderRadius: "8px",
        }}
      />
    </div>
  )}
</div>

<div className="form-group">
  <label>
    Product Images
  </label>

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
</div>



      <div className="form-group">
        <label>
          <input
            type="checkbox"
            name="isFeatured"
            checked={
              formData.isFeatured
            }
            onChange={
              handleChange
            }
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
            onChange={
              handleChange
            }
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
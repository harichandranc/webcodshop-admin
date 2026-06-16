import { useState, useEffect } from "react";
import "../styles/banner-form.css";

export default function BannerForm({
  onSubmit,
  loading,
  initialData = null,
}) {
  const [formData, setFormData] = useState({
    title: "",
    link: "",
    position: 1,
    isActive: true,
  });

  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (!initialData) return;

    setFormData({
      title: initialData.title || "",
      link: initialData.link || "",
      position: initialData.position || 1,
      isActive: initialData.isActive ?? true,
    });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...formData,
      imageFile,
    });

    if (!initialData) {
      setFormData({
        title: "",
        link: "",
        position: 1,
        isActive: true,
      });

      setImageFile(null);
    }
  };

  return (
    <form className="banner-form" onSubmit={handleSubmit}>

      <div className="form-grid">

        <div className="input-group">
          <label>Banner Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter banner title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Banner Link</label>
          <input
            type="text"
            name="link"
            placeholder="https://example.com"
            value={formData.link}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>Position</label>
          <input
            type="number"
            name="position"
            value={formData.position}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>Banner Image</label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            required={!initialData}
          />

          {imageFile && (
            <span className="file-info">
              Selected: {imageFile.name}
            </span>
          )}

          {initialData?.image && (
            <span className="file-info">
              Current Image Exists
            </span>
          )}
        </div>

      </div>

      <label className="checkbox-row">
        <input
          type="checkbox"
          name="isActive"
          checked={formData.isActive}
          onChange={handleChange}
        />
        Active Banner
      </label>

      <button className="submit-btn" type="submit" disabled={loading}>
        {loading
          ? initialData
            ? "Updating..."
            : "Creating..."
          : initialData
          ? "Update Banner"
          : "Create Banner"}
      </button>

    </form>
  );
}
import {
  useState,
  useEffect,
} from "react";

export default function BannerForm({
  onSubmit,
  loading,
  initialData = null,
}) {
  const [formData, setFormData] =
    useState({
      title: "",
      link: "",
      position: 1,
      isActive: true,
    });

  const [imageFile, setImageFile] =
    useState(null);

  useEffect(() => {
    if (!initialData) return;

    setFormData({
      title:
        initialData.title || "",
      link:
        initialData.link || "",
      position:
        initialData.position || 1,
      isActive:
        initialData.isActive ?? true,
    });
  }, [initialData]);

  const handleChange = (
    e
  ) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    });
  };

  const handleSubmit = (
    e
  ) => {
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
    <form
      className="banner-form"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="title"
        placeholder="Banner Title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="link"
        placeholder="Banner Link"
        value={formData.link}
        onChange={handleChange}
      />

      <input
        type="number"
        name="position"
        placeholder="Position"
        value={formData.position}
        onChange={handleChange}
      />

      <div className="form-group">
        <label>
          Banner Image
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setImageFile(
              e.target.files[0]
            )
          }
          required={!initialData}
        />

        {imageFile && (
          <p
            style={{
              marginTop: "8px",
              fontSize: "14px",
            }}
          >
            Selected:{" "}
            {imageFile.name}
          </p>
        )}

        {initialData?.image && (
          <p
            style={{
              marginTop: "8px",
              fontSize: "14px",
            }}
          >
            Current Image:{" "}
            {initialData.image}
          </p>
        )}
      </div>

      <label className="banner-checkbox">
        <input
          type="checkbox"
          name="isActive"
          checked={
            formData.isActive
          }
          onChange={handleChange}
        />
        Active Banner
      </label>

      <button
        type="submit"
        className="banner-submit-btn"
        disabled={loading}
      >
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
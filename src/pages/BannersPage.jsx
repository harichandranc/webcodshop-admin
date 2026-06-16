import { useEffect, useState } from "react";

import AdminLayout from "../layouts/AdminLayout";
import BannerForm from "../components/BannerForm";

import "../styles/banners.css";

import {
  getBanners,
  createBanner,
  updateBanner,
  deleteBanner,
} from "../services/bannerService";

import { uploadImage } from "../api/productApi";

export default function BannersPage() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);

  const [editingBanner, setEditingBanner] = useState(null);
  const [editing, setEditing] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);

  const loadBanners = async () => {
    try {
      const data = await getBanners();
      setBanners(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadBanners();
  }, []);

  const handleCreate = async (data) => {
    try {
      setLoading(true);

      let imageUrl = "";

      if (data.imageFile) {
        const uploadRes = await uploadImage(data.imageFile);
        imageUrl = uploadRes.imageUrl;
      }

      await createBanner({
        title: data.title,
        image: imageUrl,
        link: data.link,
        position: Number(data.position),
        isActive: data.isActive,
      });

      await loadBanners();
    } catch (error) {
      console.error(error);
      alert("Failed to create banner");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (data) => {
    try {
      setEditing(true);

      let imageUrl = editingBanner.image;

      if (data.imageFile) {
        const uploadRes = await uploadImage(data.imageFile);
        imageUrl = uploadRes.imageUrl;
      }

      await updateBanner(editingBanner._id, {
        title: data.title,
        image: imageUrl,
        link: data.link,
        position: Number(data.position),
        isActive: data.isActive,
      });

      await loadBanners();

      setShowEditModal(false);
      setEditingBanner(null);
    } catch (error) {
      console.error(error);
      alert("Failed to update banner");
    } finally {
      setEditing(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this banner?")) return;

    try {
      await deleteBanner(id);
      await loadBanners();
    } catch (error) {
      console.error(error);
      alert("Failed to delete banner");
    }
  };

  return (
    <AdminLayout>
      <div className="banners-page">

        {/* HEADER */}
        <div className="banners-header">
          <h1>Banners</h1>
        </div>

        {/* FORM */}
        <div className="banner-form-card">
          <BannerForm onSubmit={handleCreate} loading={loading} />
        </div>

        {/* LIST */}
        <div className="banners-grid">
          {banners.length === 0 ? (
            <div className="empty-state">No banners found</div>
          ) : (
            banners.map((banner) => (
              <div className="banner-card" key={banner._id}>

                {/* HEADER */}
                <div className="banner-card-header">
                  <h3>{banner.title}</h3>

                  <span
                    className={`badge ${
                      banner.isActive ? "active" : "inactive"
                    }`}
                  >
                    {banner.isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                {/* META */}
                <div className="banner-meta">
                  <span>Position: {banner.position}</span>
                  <span>Link: {banner.link || "-"}</span>
                </div>

                {/* IMAGE */}
                {banner.image && (
                  <img
                    src={`${import.meta.env.VITE_API_URL}${banner.image}`}
                    className="banner-image"
                  />
                )}

                {/* ACTIONS */}
                <div className="banner-actions">
                  <button
                    className="btn edit"
                    onClick={() => {
                      setEditingBanner(banner);
                      setShowEditModal(true);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="btn delete"
                    onClick={() => handleDelete(banner._id)}
                  >
                    Delete
                  </button>
                </div>

              </div>
            ))
          )}
        </div>

        {/* EDIT MODAL */}
        {showEditModal && editingBanner && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h3>Edit Banner</h3>
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingBanner(null);
                  }}
                >
                  ✕
                </button>
              </div>

              <BannerForm
                initialData={editingBanner}
                loading={editing}
                onSubmit={handleUpdate}
              />
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
}
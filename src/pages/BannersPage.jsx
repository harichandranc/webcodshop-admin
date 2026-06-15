import { useEffect, useState } from "react";

import AdminLayout from "../layouts/AdminLayout";
import BannerForm from "../components/BannerForm";

import "../styles/banner.css";

import {
  getBanners,
  createBanner,
  updateBanner,
  deleteBanner,
} from "../services/bannerService";

import {
  uploadImage,
} from "../api/productApi";

export default function BannersPage() {
  const [banners, setBanners] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [editingBanner, setEditingBanner] =
    useState(null);

  const [editing, setEditing] =
    useState(false);

  const [showEditModal, setShowEditModal] =
    useState(false);

  const loadBanners =
    async () => {
      try {
        const data =
          await getBanners();

        setBanners(data);
      } catch (error) {
        console.error(error);
      }
    };

  useEffect(() => {
    loadBanners();
  }, []);

  const handleCreate =
    async (data) => {
      try {
        setLoading(true);

        let imageUrl = "";

        if (data.imageFile) {
          const uploadRes =
            await uploadImage(
              data.imageFile
            );

          imageUrl =
            uploadRes.imageUrl;
        }

        await createBanner({
          title: data.title,
          image: imageUrl,
          link: data.link,
          position: Number(
            data.position
          ),
          isActive:
            data.isActive,
        });

        await loadBanners();
      } catch (error) {
        console.error(error);

        alert(
          "Failed to create banner"
        );
      } finally {
        setLoading(false);
      }
    };

  const handleUpdate =
    async (data) => {
      try {
        setEditing(true);

        let imageUrl =
          editingBanner.image;

        if (data.imageFile) {
          const uploadRes =
            await uploadImage(
              data.imageFile
            );

          imageUrl =
            uploadRes.imageUrl;
        }

        await updateBanner(
          editingBanner._id,
          {
            title: data.title,
            image: imageUrl,
            link: data.link,
            position: Number(
              data.position
            ),
            isActive:
              data.isActive,
          }
        );

        await loadBanners();

        setShowEditModal(
          false
        );

        setEditingBanner(
          null
        );
      } catch (error) {
        console.error(error);

        alert(
          "Failed to update banner"
        );
      } finally {
        setEditing(false);
      }
    };

  const handleDelete =
    async (bannerId) => {
      const confirmed =
        window.confirm(
          "Delete this banner?"
        );

      if (!confirmed) return;

      try {
        await deleteBanner(
          bannerId
        );

        await loadBanners();
      } catch (error) {
        console.error(error);

        alert(
          "Failed to delete banner"
        );
      }
    };

  return (
    <AdminLayout>
      <div className="banner-page">
        <div className="banner-page-header">
          <h1>Banners</h1>
        </div>

        <div className="banner-form-card">
          <BannerForm
            onSubmit={
              handleCreate
            }
            loading={
              loading
            }
          />
        </div>

        <div className="banner-list">
          {banners.length ===
          0 ? (
            <div className="empty-state">
              No banners found
            </div>
          ) : (
            banners.map(
              (banner) => (
                <div
                  className="banner-card"
                  key={
                    banner._id
                  }
                >
                  <div className="banner-card-header">
                    <h3 className="banner-title">
                      {
                        banner.title
                      }
                    </h3>

                    <span
                      className={`banner-status ${
                        banner.isActive
                          ? "active"
                          : "inactive"
                      }`}
                    >
                      {banner.isActive
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </div>

                  <div className="banner-meta">
                    <span>
                      Position:{" "}
                      {
                        banner.position
                      }
                    </span>

                    <span>
                      Link:{" "}
                      {banner.link ||
                        "-"
                      }
                    </span>
                  </div>

                  {banner.image && (
                    <img
                      src={`${import.meta.env.VITE_API_URL}${banner.image}`}
                      alt={
                        banner.title
                      }
                      className="banner-image"
                    />
                  )}

                  <div className="banner-actions">
                    <button
                      className="banner-edit-btn"
                      onClick={() => {
                        setEditingBanner(
                          banner
                        );

                        setShowEditModal(
                          true
                        );
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="banner-delete-btn"
                      onClick={() =>
                        handleDelete(
                          banner._id
                        )
                      }
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
            )
          )}
        </div>
      </div>

      {showEditModal &&
        editingBanner && (
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
                  Edit Banner
                </h3>

                <button
                  onClick={() => {
                    setShowEditModal(
                      false
                    );

                    setEditingBanner(
                      null
                    );
                  }}
                >
                  ✕
                </button>
              </div>

              <BannerForm
                initialData={
                  editingBanner
                }
                loading={
                  editing
                }
                onSubmit={
                  handleUpdate
                }
              />
            </div>
          </div>
        )}
    </AdminLayout>
  );
}
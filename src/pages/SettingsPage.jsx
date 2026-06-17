import { useEffect, useState } from "react";

import AdminLayout from "../layouts/AdminLayout";

import {
  getSettings,
  updateSettings,
} from "../services/settingsService";

import "../styles/settings.css";

export default function SettingsPage() {
  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      storeName: "",
      supportEmail: "",
      supportPhone: "",
      logo: "",
      facebook: "",
      instagram: "",
      youtube: "",
      footerText: "",
    });

  const loadSettings =
    async () => {
      try {
        const data =
          await getSettings();

        setFormData(data);
      } catch (error) {
        console.error(error);
      }
    };

  useEffect(() => {
    loadSettings();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);

        await updateSettings(
          formData
        );

        alert(
          "Settings updated successfully"
        );
      } catch (error) {
        console.error(error);

        alert(
          "Failed to update settings"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <AdminLayout>
      <div className="settings-page">

        <div className="settings-header">
          <h1>Settings</h1>
          <p>
            Manage your store information
          </p>
        </div>

        <form
          className="settings-form"
          onSubmit={handleSubmit}
        >
          <div className="settings-grid">

            <div className="form-group">
              <label>
                Store Name
              </label>

              <input
                name="storeName"
                value={formData.storeName}
                onChange={handleChange}
                placeholder="Store Name"
              />
            </div>

            <div className="form-group">
              <label>
                Support Email
              </label>

              <input
                name="supportEmail"
                value={formData.supportEmail}
                onChange={handleChange}
                placeholder="support@example.com"
              />
            </div>

            <div className="form-group">
              <label>
                Support Phone
              </label>

              <input
                name="supportPhone"
                value={formData.supportPhone}
                onChange={handleChange}
                placeholder="+91 9876543210"
              />
            </div>

            <div className="form-group">
              <label>
                Logo URL
              </label>

              <input
                name="logo"
                value={formData.logo}
                onChange={handleChange}
                placeholder="Logo URL"
              />
            </div>

            <div className="form-group">
              <label>
                Facebook URL
              </label>

              <input
                name="facebook"
                value={formData.facebook}
                onChange={handleChange}
                placeholder="Facebook URL"
              />
            </div>

            <div className="form-group">
              <label>
                Instagram URL
              </label>

              <input
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                placeholder="Instagram URL"
              />
            </div>

            <div className="form-group">
              <label>
                YouTube URL
              </label>

              <input
                name="youtube"
                value={formData.youtube}
                onChange={handleChange}
                placeholder="YouTube URL"
              />
            </div>

            <div className="form-group full-width">
              <label>
                Footer Text
              </label>

              <textarea
                rows="5"
                name="footerText"
                value={formData.footerText}
                onChange={handleChange}
                placeholder="Footer text"
              />
            </div>

          </div>

          <button
            type="submit"
            className="save-btn"
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : "Save Settings"}
          </button>

        </form>
      </div>
    </AdminLayout>
  );
}
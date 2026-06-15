import {
  useEffect,
  useState,
} from "react";

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

  const handleChange = (
    e
  ) => {
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
          "Settings updated"
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
        <h1>
          Settings
        </h1>

        <form
          className="settings-form"
          onSubmit={
            handleSubmit
          }
        >
          <input
            name="storeName"
            placeholder="Store Name"
            value={
              formData.storeName
            }
            onChange={
              handleChange
            }
          />

          <input
            name="supportEmail"
            placeholder="Support Email"
            value={
              formData.supportEmail
            }
            onChange={
              handleChange
            }
          />

          <input
            name="supportPhone"
            placeholder="Support Phone"
            value={
              formData.supportPhone
            }
            onChange={
              handleChange
            }
          />

          <input
            name="logo"
            placeholder="Logo URL"
            value={
              formData.logo
            }
            onChange={
              handleChange
            }
          />

          <input
            name="facebook"
            placeholder="Facebook URL"
            value={
              formData.facebook
            }
            onChange={
              handleChange
            }
          />

          <input
            name="instagram"
            placeholder="Instagram URL"
            value={
              formData.instagram
            }
            onChange={
              handleChange
            }
          />

          <input
            name="youtube"
            placeholder="YouTube URL"
            value={
              formData.youtube
            }
            onChange={
              handleChange
            }
          />

          <textarea
            name="footerText"
            placeholder="Footer Text"
            value={
              formData.footerText
            }
            onChange={
              handleChange
            }
          />

          <button
            type="submit"
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
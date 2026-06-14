import { useEffect, useState } from "react";

import AdminLayout from "../layouts/AdminLayout";

import {
  getCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon,
} from "../api/couponApi";

import "../styles/coupons.css";

function CouponsPage() {
  const [coupons, setCoupons] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [editingCoupon, setEditingCoupon] =
    useState(null);

  const [formData, setFormData] =
    useState({
      code: "",
      description: "",
      discountType: "percentage",
      value: "",
      expiryDate: "",
      usageLimit: 0,
      isActive: true,
    });

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons =
    async () => {
      try {
        setLoading(true);

        const data =
          await getCoupons();

        setCoupons(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  const handleChange = (e) => {
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

  const resetForm = () => {
    setEditingCoupon(null);

    setFormData({
      code: "",
      description: "",
      discountType:
        "percentage",
      value: "",
      expiryDate: "",
      usageLimit: 0,
      isActive: true,
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        if (editingCoupon) {
          await updateCoupon(
            editingCoupon._id,
            formData
          );
        } else {
          await createCoupon(
            formData
          );
        }

        resetForm();

        fetchCoupons();
      } catch (error) {
        console.error(error);
        alert(
          "Failed to save coupon"
        );
      }
    };

  const handleEdit = (
    coupon
  ) => {
    setEditingCoupon(coupon);

    setFormData({
      code: coupon.code,
      description:
        coupon.description ||
        "",
      discountType:
        coupon.discountType,
      value: coupon.value,
      expiryDate:
        coupon.expiryDate?.split(
          "T"
        )[0],
      usageLimit:
        coupon.usageLimit,
      isActive:
        coupon.isActive,
    });
  };

  const handleDelete =
    async (couponId) => {
      const confirmDelete =
        window.confirm(
          "Delete this coupon?"
        );

      if (!confirmDelete)
        return;

      try {
        await deleteCoupon(
          couponId
        );

        fetchCoupons();
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <AdminLayout>
      <h1>Coupons</h1>

      <form
        onSubmit={
          handleSubmit
        }
        className="coupon-form"
      >
        <div className="coupon-grid">
          <input
            type="text"
            name="code"
            placeholder="Coupon Code"
            value={
              formData.code
            }
            onChange={
              handleChange
            }
            required
            className="coupon-input"
          />

          <input
            type="text"
            name="description"
            placeholder="Description"
            value={
              formData.description
            }
            onChange={
              handleChange
            }
            className="coupon-input"
          />

          <select
            name="discountType"
            value={
              formData.discountType
            }
            onChange={
              handleChange
            }
            className="coupon-input"
          >
            <option value="percentage">
              Percentage
            </option>

            <option value="fixed">
              Fixed Amount
            </option>
          </select>

          <input
            type="number"
            name="value"
            placeholder="Value"
            value={
              formData.value
            }
            onChange={
              handleChange
            }
            required
            className="coupon-input"
          />

          <input
            type="date"
            name="expiryDate"
            value={
              formData.expiryDate
            }
            onChange={
              handleChange
            }
            required
            className="coupon-input"
          />

          <input
            type="number"
            name="usageLimit"
            placeholder="Usage Limit"
            value={
              formData.usageLimit
            }
            onChange={
              handleChange
            }
            className="coupon-input"
          />
        </div>

        <label className="coupon-checkbox">
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
          Active Coupon
        </label>

        <div className="coupon-actions">
          <button
            type="submit"
            className="btn-primary"
          >
            {editingCoupon
              ? "Update Coupon"
              : "Create Coupon"}
          </button>

          <button
            type="button"
            onClick={resetForm}
            className="btn-secondary"
          >
            Reset
          </button>
        </div>
      </form>

      <div className="coupon-table-container">
        {loading ? (
          <p
            style={{
              padding:
                "20px",
            }}
          >
            Loading...
          </p>
        ) : (
          <table className="coupon-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Type</th>
                <th>Value</th>
                <th>Used</th>
                <th>Limit</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {coupons.map(
                (coupon) => (
                  <tr
                    key={
                      coupon._id
                    }
                  >
                    <td>
                      {
                        coupon.code
                      }
                    </td>

                    <td>
                      {
                        coupon.discountType
                      }
                    </td>

                    <td>
                      {coupon.discountType ===
                      "percentage"
                        ? `${coupon.value}%`
                        : `₹${coupon.value}`}
                    </td>

                    <td>
                      {
                        coupon.usedCount
                      }
                    </td>

                    <td>
                      {
                        coupon.usageLimit
                      }
                    </td>

                    <td>
                      <span
                        className={
                          coupon.isActive
                            ? "status-active"
                            : "status-inactive"
                        }
                      >
                        {coupon.isActive
                          ? "Active"
                          : "Inactive"}
                      </span>
                    </td>

                    <td>
                      <div className="action-buttons">
                        <button
                          onClick={() =>
                            handleEdit(
                              coupon
                            )
                          }
                          className="btn-edit"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(
                              coupon._id
                            )
                          }
                          className="btn-delete"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
}

export default CouponsPage;
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
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingCoupon, setEditingCoupon] = useState(null);

  const [formData, setFormData] = useState({
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

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const data = await getCoupons();
      setCoupons(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const resetForm = () => {
    setEditingCoupon(null);

    setFormData({
      code: "",
      description: "",
      discountType: "percentage",
      value: "",
      expiryDate: "",
      usageLimit: 0,
      isActive: true,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingCoupon) {
        await updateCoupon(editingCoupon._id, formData);
      } else {
        await createCoupon(formData);
      }

      resetForm();
      fetchCoupons();
    } catch (error) {
      console.error(error);
      alert("Failed to save coupon");
    }
  };

  const handleEdit = (coupon) => {
    setEditingCoupon(coupon);

    setFormData({
      code: coupon.code,
      description: coupon.description || "",
      discountType: coupon.discountType,
      value: coupon.value,
      expiryDate: coupon.expiryDate?.split("T")[0],
      usageLimit: coupon.usageLimit,
      isActive: coupon.isActive,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this coupon?")) return;

    try {
      await deleteCoupon(id);
      fetchCoupons();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AdminLayout>
      <div className="coupons-page">

        {/* HEADER */}
        <div className="coupons-header">
          <h1>Coupons</h1>
        </div>

        {/* FORM */}
        <form className="coupon-form" onSubmit={handleSubmit}>
          <div className="coupon-grid">

            <input
              className="input"
              type="text"
              name="code"
              placeholder="Coupon Code"
              value={formData.code}
              onChange={handleChange}
              required
            />

            <input
              className="input"
              type="text"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
            />

            <select
              className="input"
              name="discountType"
              value={formData.discountType}
              onChange={handleChange}
            >
              <option value="percentage">Percentage</option>
              <option value="fixed">Fixed</option>
            </select>

            <input
              className="input"
              type="number"
              name="value"
              placeholder="Value"
              value={formData.value}
              onChange={handleChange}
              required
            />

            <input
              className="input"
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              required
            />

            <input
              className="input"
              type="number"
              name="usageLimit"
              placeholder="Usage Limit"
              value={formData.usageLimit}
              onChange={handleChange}
            />

          </div>

          <label className="checkbox">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
            />
            Active Coupon
          </label>

          <div className="actions">
            <button className="btn primary" type="submit">
              {editingCoupon ? "Update Coupon" : "Create Coupon"}
            </button>

            <button className="btn secondary" type="button" onClick={resetForm}>
              Reset
            </button>
          </div>
        </form>

        {/* TABLE */}
        <div className="table-card">
          {loading ? (
            <p className="muted">Loading...</p>
          ) : (
            <table className="table">
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
                {coupons.map((coupon) => (
                  <tr key={coupon._id}>
                    <td>{coupon.code}</td>

                    <td className="muted">
                      {coupon.discountType}
                    </td>

                    <td className="highlight">
                      {coupon.discountType === "percentage"
                        ? `${coupon.value}%`
                        : `₹${coupon.value}`}
                    </td>

                    <td>{coupon.usedCount}</td>

                    <td>{coupon.usageLimit}</td>

                    <td>
                      <span
                        className={`badge ${
                          coupon.isActive ? "active" : "inactive"
                        }`}
                      >
                        {coupon.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td>
                      <button
                        className="btn edit"
                        onClick={() => handleEdit(coupon)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn delete"
                        onClick={() => handleDelete(coupon._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </AdminLayout>
  );
}

export default CouponsPage;
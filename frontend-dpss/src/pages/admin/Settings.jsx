import { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import "./Settings.css";
import adminService from "../../services/adminService";

export default function Settings() {
  const [admin, setAdmin] = useState(null);
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("admin"));
    if (stored) {
      setAdmin(stored);
      setEmail(stored.email || "");
    }
  }, []);

  const showMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(""), 4000);
  };

  const handleUpdateEmail = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      showMessage("يرجى إدخال البريد الإلكتروني", "error");
      return;
    }
    setLoading(true);
    try {
      const response = await adminService.updateEmail(admin.id, email);
      const updatedAdmin = { ...admin, email };
      localStorage.setItem("admin", JSON.stringify(updatedAdmin));
      setAdmin(updatedAdmin);
      showMessage("تم تحديث البريد الإلكتروني بنجاح", "success");
    } catch (err) {
      showMessage(err.response?.data || "حدث خطأ أثناء تحديث البريد الإلكتروني", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      showMessage("يرجى ملء جميع الحقول", "error");
      return;
    }
    if (newPassword !== confirmPassword) {
      showMessage("كلمة المرور الجديدة غير متطابقة", "error");
      return;
    }
    if (newPassword.length < 6) {
      showMessage("كلمة المرور يجب أن تكون 6 أحرف على الأقل", "error");
      return;
    }
    setLoading(true);
    try {
      await adminService.updatePassword(admin.id, currentPassword, newPassword);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      showMessage("تم تغيير كلمة المرور بنجاح", "success");
    } catch (err) {
      showMessage(err.response?.data || "حدث خطأ أثناء تغيير كلمة المرور", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="settings-container">
        <h1 className="settings-title">⚙️ الإعدادات</h1>

        {message && (
          <div className={`settings-message ${messageType}`}>
            {message}
          </div>
        )}

        <div className="settings-section">
          <h2>📧 تغيير البريد الإلكتروني</h2>
          <form onSubmit={handleUpdateEmail}>
            <div className="form-group">
              <label>البريد الإلكتروني الحالي</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="أدخل البريد الإلكتروني الجديد"
                required
              />
            </div>
            <button type="submit" className="settings-btn" disabled={loading}>
              {loading ? "جاري التحديث..." : "تحديث البريد الإلكتروني"}
            </button>
          </form>
        </div>

        <div className="settings-section">
          <h2>🔒 تغيير كلمة المرور</h2>
          <form onSubmit={handleUpdatePassword}>
            <div className="form-group">
              <label>كلمة المرور الحالية</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="أدخل كلمة المرور الحالية"
                required
              />
            </div>
            <div className="form-group">
              <label>كلمة المرور الجديدة</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="أدخل كلمة المرور الجديدة"
                required
              />
            </div>
            <div className="form-group">
              <label>تأكيد كلمة المرور الجديدة</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="أعد إدخال كلمة المرور الجديدة"
                required
              />
            </div>
            <button type="submit" className="settings-btn" disabled={loading}>
              {loading ? "جاري التحديث..." : "تغيير كلمة المرور"}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}

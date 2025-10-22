import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { User, Mail, LogOut, Camera } from "lucide-react";
import defaultAvatar from "@/assets/ProfilePhoto.png";
import { authApi } from "@/api/services/AuthApi";

export const ProfileForm = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    profile_image: defaultAvatar,
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await authApi.getProfile();
        setForm(data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEditToggle = () => setIsEditing(true);

  const handleSave = async () => {
    try {
      const updated = await authApi.updateProfile({
        first_name: form.first_name,
        last_name: form.last_name,
      });
      setForm(updated);
      setIsEditing(false);
      alert("Profil berhasil diperbarui!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Gagal memperbarui profil.");
    }
  };

  const handleCancel = () => setIsEditing(false);

  const handleLogout = () => {
    authApi.logout();
    navigate("/login");
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSize = 100 * 1024; 
    if (file.size > maxSize) {
      alert("Ukuran foto maksimal 100KB!");
      e.target.value = ""; 
      return;
    }

    setPreviewImage(URL.createObjectURL(file));
    setUploading(true);

    try {
      const updated = await authApi.uploadProfileImage(file);
      setForm((prev) => ({ ...prev, profile_image: updated.profile_image }));
      alert("Foto profil berhasil diperbarui!");
    } catch (error) {
      console.error("Failed to upload image:", error);
      alert("Gagal memperbarui foto profil.");
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading profile...</p>;
  }

  return (
    <div className="space-y-6 w-full max-w-2xl mx-auto px-4 md:px-0">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative group">
          <img
            src={previewImage || form.profile_image || defaultAvatar}
            alt="Avatar"
            className="w-28 h-28 rounded-full object-cover border-2 border-gray-300"
          />

          <label className="absolute bottom-0 right-0 bg-red-500 p-2 rounded-full text-white hover:bg-red-600 cursor-pointer flex items-center justify-center">
            <Camera size={16} />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              disabled={uploading}
            />
          </label>

          {uploading && (
            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center text-white text-sm">
              Uploading...
            </div>
          )}
        </div>
        <h2 className="text-xl font-semibold">
          {form.first_name} {form.last_name}
        </h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block mb-1 text-gray-700 font-medium">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              disabled
              className="w-full border px-3 py-2 pl-10 rounded border-gray-300 bg-gray-100"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 text-gray-700 font-medium">
            Nama Depan
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full border px-3 py-2 pl-10 rounded ${
                isEditing ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-red-500`}
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 text-gray-700 font-medium">
            Nama Belakang
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full border px-3 py-2 pl-10 rounded ${
                isEditing ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-red-500`}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start mt-4">
        {!isEditing ? (
          <>
            <button
              onClick={handleEditToggle}
              className="flex-1 py-2 border border-red-500 text-red-500 font-semibold rounded hover:bg-red-50"
            >
              Edit Profile
            </button>

            <button
              onClick={handleLogout}
              className="flex-1 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 flex items-center justify-center"
            >
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleSave}
              className="flex-1 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600"
            >
              Simpan
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 py-2 border border-gray-300 text-gray-700 font-semibold rounded hover:bg-gray-100"
            >
              Batalkan
            </button>
          </>
        )}
      </div>
    </div>
  );
};

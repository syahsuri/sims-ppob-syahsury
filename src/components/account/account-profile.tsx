import { useState } from "react";
import { User, Mail, Edit, LogOut } from "lucide-react";
import defaultAvatar from "@/assets/ProfilePhoto.png";

interface ProfileFormProps {
  initialData?: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

export const ProfileForm = ({
  initialData = {
    firstName: "Kristanto",
    lastName: "Wibowo",
    email: "kristanto@example.com",
  },
}: ProfileFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEditToggle = () => setIsEditing(true);
  const handleSave = () => setIsEditing(false); // Add save logic
  const handleCancel = () => {
    setForm(initialData);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6 w-full max-w-2xl mx-auto px-4 md:px-0">
      {/* Avatar */}
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <img
            src={defaultAvatar}
            alt="Avatar"
            className="w-28 h-28 rounded-full object-cover border-2 border-gray-300"
          />
          <button
            className="absolute bottom-0 right-0 bg-red-500 p-2 rounded-full text-white hover:bg-red-600"
            onClick={handleEditToggle}
          >
            <Edit size={16} />
          </button>
        </div>
        <h2 className="text-xl font-semibold">
          {form.firstName} {form.lastName}
        </h2>
      </div>

      {/* Form Fields */}
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
              placeholder="Email"
              disabled={!isEditing}
              className={`w-full border px-3 py-2 pl-10 rounded ${
                isEditing ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-red-500`}
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 text-gray-700 font-medium">Nama Depan</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="Nama Depan"
              disabled={!isEditing}
              className={`w-full border px-3 py-2 pl-10 rounded ${
                isEditing ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-red-500`}
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 text-gray-700 font-medium">Nama Belakang</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Nama Belakang"
              disabled={!isEditing}
              className={`w-full border px-3 py-2 pl-10 rounded ${
                isEditing ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-red-500`}
            />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start mt-4">
        {!isEditing ? (
          <>
            <button
              onClick={handleEditToggle}
              className="flex-1 py-2 border border-red-500 text-red-500 font-semibold rounded hover:bg-red-50"
            >
              Edit Profile
            </button>

            <button className="flex-1 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 flex items-center justify-center">
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

"use client";
import { useState } from "react";
import {
  PlusCircle,
  Tag,
  MapPin,
  Calendar,
  ScrollText,
  CheckCircle,
  Upload,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Phone,
} from "lucide-react";
import AdminRestricted from "@/app/components/NotForAdmin";

const InputField = ({
  icon: Icon,
  label,
  name,
  type = "text",
  required = true,
  placeholder,
  children,
  className = "",
  value,
  onChange,
  disabled,
}) => (
  <div className={`space-y-2 ${className}`}>
    <label
      htmlFor={name}
      className="block text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1"
    >
      {label} {required && <span className="text-emerald-500">*</span>}
    </label>
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors">
        <Icon size={20} />
      </div>
      {children || (
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className="w-full h-14 bg-slate-50 border border-slate-100 rounded-2xl px-4 pl-12 focus:outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500/50 transition-all duration-300 font-medium text-slate-700 placeholder:text-slate-300"
        />
      )}
    </div>
  </div>
);

export default function ReportFoundItemForm() {
  const initialFormState = {
    name: "",
    category: "",
    location: "",
    description: "",
    phoneNumber: "",
    date: new Date().toISOString().split("T")[0],
    imageFile: null,
  };

  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const categories = [
    "Electronics",
    "Wallet",
    "Keys",
    "Textbook",
    "Clothing",
    "Jewelry",
    "Bags/Backpacks",
    "Documents",
    "Other",
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imageFile" && files?.length > 0) {
      setFormData((prev) => ({ ...prev, imageFile: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Please login to submit a report.");

      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "imageFile") {
          if (formData[key]) formDataToSend.append("photos", formData[key]);
        } else {
          // 2. Logic ensures 'phoneNumber' is sent to the backend
          formDataToSend.append(
            key === "name" ? "itemName" : key,
            formData[key],
          );
        }
      });

      const res = await fetch("http://localhost:5000/report/foundItem", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formDataToSend,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to submit");

      setMessage({
        type: "success",
        text: "Thank you! Item reported successfully.",
      });
      setFormData(initialFormState);
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  let role = null;
  if (typeof window !== "undefined") {
    const user = JSON.parse(localStorage.getItem("user"));
    role = user?.role;
  }

  if (role == "admin") {
    return <AdminRestricted />;
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-6 flex justify-center items-center">
      <div className="w-full max-w-4xl bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        {/* Header Section */}
        <div className="bg-indigo-600 p-10 text-white relative overflow-hidden">
          <div className="absolute -top-10 -right-10 opacity-10 rotate-12">
            <Sparkles size={200} />
          </div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-400/20 text-emerald-100 rounded-full mb-4 backdrop-blur-md border border-emerald-400/20">
              <PlusCircle size={14} className="text-emerald-300" />
              <span className="text-[10px] font-black uppercase tracking-widest">
                Community Act
              </span>
            </div>
            <h1 className="text-4xl font-black tracking-tight">
              Found an Item?
            </h1>
            <p className="text-indigo-100 mt-2 font-medium">
              Help return property to its rightful owner by listing it here.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <InputField
              icon={Tag}
              label="Item Name"
              name="name"
              placeholder="e.g., iPhone 13 with Blue Case"
              value={formData.name}
              onChange={handleChange}
              disabled={isSubmitting}
            />

            <InputField icon={Tag} label="Category" name="category">
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="w-full h-14 bg-slate-50 border border-slate-100 rounded-2xl px-4 pl-12 focus:outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500/50 transition-all font-medium text-slate-700 appearance-none cursor-pointer"
              >
                <option value="" disabled>
                  Select category
                </option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </InputField>

            <InputField
              icon={MapPin}
              label="Where was it found?"
              name="location"
              placeholder="e.g., Science Lab 204"
              value={formData.location}
              onChange={handleChange}
              disabled={isSubmitting}
            />

            {/* 3. New Phone Number Field */}
            <InputField
              icon={Phone}
              label="Your Phone Number"
              name="phoneNumber"
              type="tel"
              placeholder="e.g., +1 (555) 000-0000"
              value={formData.phoneNumber}
              onChange={handleChange}
              disabled={isSubmitting}
            />

            <InputField
              icon={Calendar}
              label="Date Found"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              disabled={isSubmitting}
              className="md:col-span-2" // Spanning full width to keep layout balanced
            />
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1">
              Description <span className="text-emerald-500">*</span>
            </label>
            <div className="relative group">
              <ScrollText
                className="absolute left-4 top-4 text-slate-300 group-focus-within:text-emerald-500 transition-colors"
                size={20}
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                disabled={isSubmitting}
                placeholder="Be descriptive (color, brand, distinguishing features)..."
                className="w-full bg-slate-50 border border-slate-100 rounded-[1.5rem] p-4 pl-12 focus:outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500/50 transition-all font-medium text-slate-700"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1">
              Item Photo (Optional)
            </label>
            <div className="relative border-2 border-dashed border-slate-100 p-10 rounded-[2rem] flex flex-col items-center justify-center bg-slate-50/50 group hover:border-emerald-400 hover:bg-emerald-50/30 transition-all cursor-pointer">
              <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-slate-300 group-hover:text-emerald-600 group-hover:scale-110 transition-all duration-300 mb-4">
                <Upload size={28} />
              </div>
              <p className="text-sm font-bold text-slate-600">
                {formData.imageFile
                  ? formData.imageFile.name
                  : "Select or drop image"}
              </p>
              <input
                name="imageFile"
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>

          {message && (
            <div
              className={`p-4 rounded-2xl flex items-center gap-3 animate-in fade-in zoom-in-95 duration-300 ${
                message.type === "error"
                  ? "bg-rose-50 text-rose-600 border border-rose-100"
                  : "bg-emerald-50 text-emerald-600 border border-emerald-100"
              }`}
            >
              {message.type === "error" ? (
                <AlertCircle size={20} />
              ) : (
                <CheckCircle size={20} />
              )}
              <span className="font-bold text-sm">{message.text}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full h-16 rounded-[1.5rem] font-black uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-3 shadow-xl active:scale-95
              ${
                isSubmitting
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                  : "bg-emerald-600 text-white hover:bg-slate-900 shadow-emerald-100"
              }`}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
                <span>Posting Report...</span>
              </div>
            ) : (
              <>
                <span>Submit Found Report</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

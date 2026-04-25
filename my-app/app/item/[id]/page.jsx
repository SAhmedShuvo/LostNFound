"use client";
import { Calendar, Clock, Info, MapPin, Tag } from "lucide-react";
import Image from "next/image";
import { use, useEffect, useState } from "react";

const ItemDetails = ({ params }) => {
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  //console.log("Item ID:", id);

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await fetch(`http://localhost:5000/item/details/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setItem(data.data || data); // depends on your API
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  if (!item) return <div className="p-10 text-center">Item not found.</div>;
  if (!token)
    return (
      <div className="p-10 text-center">You are not a registered users.</div>
    );

  return (
    <div className="max-w-4xl min-h-[90vh] mx-auto p-6 space-y-6">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
        {item.itemName}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image */}
        <div className="w-full flex justify-center">
          <img
            src={
              item.photos?.[0] ||
              "https://placehold.co/500x500/4F46E5/FFFFFF?text=Item"
            }
            width={500}
            height={500}
            alt={item.itemName}
            className="rounded-xl shadow-lg border object-cover"
          />
        </div>

        {/* Details */}
        <div className="space-y-5">
          {/* Status */}
          <div
            className={`text-center py-2 rounded-xl font-bold text-lg shadow ${
              item.status === "pending"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            STATUS: {item.status.toUpperCase()}
          </div>

          {/* Info Card */}
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 space-y-4 shadow-sm">
            <h3 className="text-xl font-semibold flex items-center text-gray-800">
              <Info className="w-5 h-5 mr-2 text-indigo-600" />
              Item Information
            </h3>

            <p className="text-gray-600">{item.description}</p>

            <div className="space-y-3 text-sm text-gray-700">
              <p className="flex items-center">
                <Tag className="w-4 h-4 mr-2 text-indigo-500" />
                <strong className="mr-1">Type:</strong> {item.type}
              </p>

              <p className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-indigo-500" />
                <strong className="mr-1">
                  Last Seen / Found Location:
                </strong>{" "}
                {item.location}
              </p>

              <p className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-indigo-500" />
                <strong className="mr-1">Approx. Date:</strong>{" "}
                {new Date(item.date).toLocaleDateString("en-GB")}
              </p>

              <p className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-indigo-500" />
                <strong className="mr-1">Reported On:</strong>{" "}
                {new Date(item.createdAt).toLocaleDateString("en-GB")}
              </p>
            </div>
          </div>

          {/* Claim Button */}
          <button
            className="
              w-full 
              py-3 
              bg-indigo-600 
              text-white 
              rounded-xl 
              font-semibold 
              text-lg 
              shadow-md 
              hover:bg-indigo-700 
              transition
            "
          >
            Claim This Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;

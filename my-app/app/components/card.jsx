import Link from "next/link";
import {
  Tag,
  MapPin,
  Calendar,
  ChevronRight,
  Trash2,
  Eye,
  ArrowUpRight,
} from "lucide-react";

const WideCard = ({ item, onDelete }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "text-amber-600 bg-amber-50 border-amber-100";
      case "accepted":
        return "text-emerald-600 bg-emerald-50 border-emerald-100";
      default:
        return "text-indigo-600 bg-indigo-50 border-indigo-100";
    }
  };

  return (
    <div className="group relative w-full mb-8 max-w-5xl mx-auto">
      {/* Glow Effect on Hover */}
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2.6rem] blur opacity-0 group-hover:opacity-10 transition duration-1000 group-hover:duration-200"></div>

      <div className="relative flex flex-col md:flex-row bg-white border border-slate-100 rounded-[2.5rem] p-5 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden">
        {/* 1. Image Section - Square Bento Style */}
        <div className="relative h-56 w-full md:w-56 flex-shrink-0 overflow-hidden rounded-[2rem] bg-slate-100">
          <img
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            src={item.photos?.[0] || "https://placehold.co/400?text=No+Photo"}
            alt={item.itemName}
          />
          {/* Status Badge */}
          <div className="absolute top-4 left-4">
            <span
              className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-xl border backdrop-blur-md bg-white/90 shadow-sm ${getStatusColor(item.status)}`}
            >
              {item.status || "Listed"}
            </span>
          </div>
        </div>

        {/* 2. Content Section */}
        <div className="flex flex-col flex-grow px-2 md:px-8 py-4 justify-between">
          <div>
            <div className="flex justify-between items-start">
              <h3 className="text-3xl font-black text-slate-800 tracking-tight group-hover:text-indigo-600 transition-colors">
                {item.itemName}
              </h3>
              <div className="hidden md:block p-2 bg-slate-50 rounded-full text-slate-300 group-hover:text-indigo-500 group-hover:bg-indigo-50 transition-all">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </div>

            {/* Meta Tags */}
            <div className="flex flex-wrap gap-x-6 gap-y-3 mt-4">
              <div className="flex items-center text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">
                <Tag className="w-3.5 h-3.5 mr-2 text-indigo-500" />
                {item.category || "General"}
              </div>
              <div className="flex items-center text-xs font-bold text-slate-500">
                <MapPin className="w-3.5 h-3.5 mr-2 text-rose-500" />
                {item.location}
              </div>
              <div className="flex items-center text-xs font-bold text-slate-500">
                <Calendar className="w-3.5 h-3.5 mr-2 text-amber-500" />
                {new Date(item.date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                })}
              </div>
            </div>

            <p className="mt-5 text-slate-500 text-sm line-clamp-2 leading-relaxed font-medium">
              {item.description ||
                "No additional description provided for this item."}
            </p>
          </div>

          {/* 3. Action Bar */}
          <div className="flex items-center gap-3 mt-8 pt-6 border-t border-slate-50">
            <Link href={`/item/${item._id}`} className="flex-1 max-w-[140px]">
              <button className="group/btn w-full flex items-center justify-center gap-2 py-3 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-2xl text-[11px] font-black uppercase tracking-wider transition-all active:scale-95">
                <Eye className="w-4 h-4 group-hover/btn:text-indigo-600" />
                Details
              </button>
            </Link>

            <Link
              href={`/claimItem/${item._id}`}
              className="flex-1 max-w-[140px]"
            >
              <button className="w-full py-3 bg-indigo-600 hover:bg-slate-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-wider transition-all shadow-lg shadow-indigo-100 active:scale-95">
                Claim
              </button>
            </Link>

            {onDelete && (
              <button
                onClick={() => onDelete(item._id)}
                className="ml-auto p-3 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-all active:scale-90"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WideCard;

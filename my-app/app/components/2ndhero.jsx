"use client";

import { useEffect, useState } from "react";
import { Search, CheckCircle2, Package, TrendingUp } from "lucide-react";

export default function AfterHero() {
  const [stats, setStats] = useState({
    lost: 0,
    found: 0,
    returned: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchstats = async () => {
      try {
        const res = await fetch("http://localhost:5000/item/stats");
        const newData = await res.json();
        setStats(newData.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchstats();
  }, []);

  const statCards = [
    {
      label: "Lost Reports",
      value: stats.lost,
      icon: <Search className="w-6 h-6 text-rose-500" />,
      bgColor: "bg-rose-50",
      textColor: "text-rose-700",
      borderColor: "border-rose-100",
    },
    {
      label: "Found Items",
      value: stats.found,
      icon: <Package className="w-6 h-6 text-emerald-500" />,
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-700",
      borderColor: "border-emerald-100",
    },
    {
      label: "Successfully Returned",
      value: stats.returned,
      icon: <CheckCircle2 className="w-6 h-6 text-indigo-500" />,
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-700",
      borderColor: "border-indigo-100",
    },
  ];

  return (
    <section className="relative w-full py-12 px-6 md:px-20 bg-white">
      {/* Background Subtle Label */}
      <div className="flex items-center gap-2 mb-8 justify-center md:justify-start">
        <TrendingUp className="w-4 h-4 text-slate-400" />
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          Live Campus Activity
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((card, index) => (
          <div
            key={index}
            className={`group relative overflow-hidden bg-white border ${card.borderColor} rounded-[2rem] p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1`}
          >
            {/* Subtle Icon Background Decor */}
            <div
              className={`absolute -right-4 -bottom-4 opacity-5 transition-transform duration-700 group-hover:scale-150 group-hover:-rotate-12`}
            >
              {card.icon}
            </div>

            <div className="flex flex-col gap-4">
              <div
                className={`w-12 h-12 ${card.bgColor} rounded-2xl flex items-center justify-center shadow-sm`}
              >
                {card.icon}
              </div>

              <div>
                <h3 className="text-4xl font-black text-slate-900 tracking-tight">
                  {loading ? (
                    <span className="animate-pulse opacity-20">00</span>
                  ) : (
                    card.value
                  )}
                  <span className={`${card.textColor} ml-1`}>+</span>
                </h3>
                <p className="text-slate-500 font-bold text-sm uppercase tracking-tight mt-1">
                  {card.label}
                </p>
              </div>

              <div className="w-full bg-slate-50 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full ${card.bgColor.replace("50", "500")} opacity-40 transition-all duration-1000`}
                  style={{ width: loading ? "0%" : "70%" }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

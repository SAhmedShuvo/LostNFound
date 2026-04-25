"use client";
import { useState } from "react";
import LostOrFoundButton from "../components/lostOrfoundButton";
import ItemSection from "../components/Itemsection";
import AdminRestricted from "../components/NotForAdmin";

export default function Home() {
  let role = null;
  if (typeof window !== "undefined") {
    const user = JSON.parse(localStorage.getItem("user"));
    role = user?.role;
  }

  if (role == "admin") {
    return <AdminRestricted />;
  }
  return (
    <div>
      <ItemSection />
    </div>
  );
}

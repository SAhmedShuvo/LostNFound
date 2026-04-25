"use client";
import { useState } from "react";
import Footer from "./components/footer";
import Hero from "./components/herosection";
import Navbar from "./components/navbar";
import AfterHero from "./components/2ndhero";
import AdminRestricted from "./components/NotForAdmin";

export default function Home() {
  const [lostOrFound, setLostOrFound] = useState("lost");
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
      <Navbar/>
      <Hero/>
      <AfterHero/>
    <Footer/>

    </div>
  );
}

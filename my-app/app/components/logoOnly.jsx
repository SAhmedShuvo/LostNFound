
import { New_Rocker } from "next/font/google";

const newRocker = New_Rocker({
  subsets: ["latin"],
  weight: "400",
});


import Link from "next/link";

const Logo = () => {

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0">
      <div className="text-2xl {} font-bold text-gray-800">
        <Link href="/"> <h1 className={`text-3xl ${newRocker.className}`}>
        CoU Lost & Found
      </h1></Link>
      </div>
      
    </nav>
  );
};

export default Logo;

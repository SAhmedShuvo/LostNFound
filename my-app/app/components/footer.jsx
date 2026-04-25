export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 py-6 pt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        
        {/* Left - Branding */}
        <h1 className="text-xl font-semibold text-white">
          Lost & Found
        </h1>

        {/* Middle - Links */}
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition">Home</a>
          <a href="#" className="hover:text-white transition">Report Lost</a>
          <a href="#" className="hover:text-white transition">Report Found</a>
          <a href="#" className="hover:text-white transition">Contact</a>
        </div>

        {/* Right - Copyright */}
        <p className="text-sm mt-4 md:mt-0">
          © {new Date().getFullYear()} Lost & Found. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

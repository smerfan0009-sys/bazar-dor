import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* navbar start */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/logo-icon.png"
            alt="Logo"
            width={45}
            height={45}
            priority
            className="object-contain"
          />
          <span className="text-xl font-bold text-[#05893E]">BrandName</span>
        </Link>

        {/* navbar end */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#05893E] transition-colors"
          >
            Log in
          </Link>

          <Link
            href="/signup"
            className="px-5 py-2 text-sm font-medium text-white bg-[#05893E] hover:bg-[#046e32] rounded-lg shadow-sm transition-all duration-200"
          >
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

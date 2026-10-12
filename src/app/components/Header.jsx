import Image from "next/image";
import Link from "next/link";
import NavLinks from "./NavLinks";

const Header = () => {
  const currentDate = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <div className="sticky top-0 z-50 bg-base-100 w-full" >
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 hover:cursor-pointer"
          >
            <div className="bg-[#05893E] p-2.5 rounded-2xl flex items-center justify-center">
              <Image
                src="/assets/logo-icon.png"
                alt="logo"
                width={30}
                height={30}
                priority
              />
            </div>

            <div>
              <h1 className="text-xl font-extrabold text-gray-700 leading-tight">
                বাজার দর
              </h1>
              <p className="text-xs text-gray-700 font-medium h-8 overflow-hidden">
                {currentDate}
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/signin"
              className="px-6 py-2.5 rounded-xl text-m font-bold text-gray-700 hover:bg-gray-200 hover:text-[#05893E] transition-colors"
            >
              সাইন ইন
            </Link>

            <Link
              href="/signup"
              className="px-6 py-2.5 text-m font-bold text-white bg-[#05893E] shadow-emerald-600 hover:bg-[#046e32] hover:text-gray-200 rounded-xl shadow-md transition-all duration-200"
            >
              সাইন আপ
            </Link>
          </div>
        </div>
      </div>
      <NavLinks />
    </div>
  );
};

export default Header;

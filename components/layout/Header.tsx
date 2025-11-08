"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ACCOM_TYPES, APP_NAME } from "@/constants";

export default function Header() {
  const router = useRouter();
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="flex items-center justify-between px-4 md:px-8 py-3 relative">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <Image src="/assets/logo2.png" alt="Logo" width={40} height={40} />
          <span className="text-2xl font-bold text-gray-800">{APP_NAME}</span>
        </div>

        {/* Search */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden md:block w-full max-w-md">
          <input
            type="text"
            placeholder="Search destinations"
            className="w-full border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-gray-700 text-sm">
                Hi, {user.first_name || user.email}
              </span>
              <button
                onClick={logout}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-full text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => router.push("/signin")}
                className="text-gray-700 text-sm hover:text-pink-500"
              >
                Sign In
              </button>
              <button
                onClick={() => router.push("/signup")}
                className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full text-sm"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>

      <nav className="border-t border-gray-100 flex justify-center gap-6 px-4 md:px-8 py-2 overflow-x-auto">
        {ACCOM_TYPES.map((type) => (
          <button
            key={type}
            className="text-gray-700 hover:text-pink-500 whitespace-nowrap text-sm md:text-base"
          >
            {type}
          </button>
        ))}
      </nav>
    </header>
  );
}

// import React from "react";
// import Image from "next/image";
// import { ACCOM_TYPES, APP_NAME } from "@/constants";

// export default function Header() {
//   return (
//     <header className="sticky top-0 z-50 bg-white shadow-md">
//       {/* Top row */}
//       <div className="flex items-center justify-between px-4 md:px-8 py-3 relative">
//         {/* Logo (left) */}
//         <div className="flex items-center gap-2">
//           <Image
//             src="/assets/logo2.png"
//             alt="AirbnbClone logo"
//             width={40}
//             height={40}
//             className="h-10 w-10"
//           />
//           <span className="text-2xl font-bold text-gray-800">{APP_NAME}</span>
//         </div>

//         {/* Search Bar (centered) */}
//         <div className="absolute left-1/2 -translate-x-1/2 hidden md:block w-full max-w-md">
//           <input
//             type="text"
//             placeholder="Search destinations"
//             className="w-full border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
//           />
//         </div>

//         {/* Auth Buttons (right) */}
//         <div className="flex items-center gap-4">
//           <button className="text-gray-700 text-sm hover:text-pink-500">
//             Sign In
//           </button>
//           <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full text-sm">
//             Sign Up
//           </button>
//         </div>
//       </div>

//       {/* Bottom navigation row */}
//       <nav className="border-t border-gray-100 flex justify-center gap-6 px-4 md:px-8 py-2 overflow-x-auto">
//         {ACCOM_TYPES.map((type) => (
//           <button
//             key={type}
//             className="text-gray-700 hover:text-pink-500 whitespace-nowrap text-sm md:text-base transition"
//           >
//             {type}
//           </button>
//         ))}
//       </nav>
//     </header>
//   );
// }

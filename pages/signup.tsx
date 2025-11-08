"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

// ✅ Step 1: define a type for the form fields
interface SignUpForm {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number: string;
  role: "guest" | "host" | string; // adjust as needed
  [key: string]: string; // allows dynamic key access in map()
}

export default function SignUpPage() {
  const { register } = useAuth();
  const router = useRouter();

  // ✅ Step 2: strongly type the useState hook
  const [form, setForm] = useState<SignUpForm>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone_number: "",
    role: "guest",
  });

  const [error, setError] = useState("");

  // ✅ Step 3: keep handleChange fully type-safe
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await register(form);
      router.push("/signin");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md p-8 rounded-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        {["first_name", "last_name", "email", "password", "phone_number"].map(
          (f) => (
            <input
              key={f}
              name={f}
              type={
                f === "password" ? "password" : f === "email" ? "email" : "text"
              }
              placeholder={f.replace("_", " ").toUpperCase()}
              className="border p-2 w-full rounded mb-3"
              value={form[f]} // ✅ safe, no `as any`
              onChange={handleChange}
            />
          )
        )}

        <button
          type="submit"
          className="bg-pink-600 text-white w-full py-2 rounded"
        >
          Sign Up
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          {/* <a href="/signin" className="text-pink-600 hover:underline">
            Sign In
          </a> */}
          <Link href="/signup/">Sign In</Link>
        </p>
      </form>
    </div>
  );
}

// "use client";
// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useAuth } from "@/context/AuthContext";

// export default function SignUpPage() {
//   const { register } = useAuth();
//   const router = useRouter();
//   const [form, setForm] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     password: "",
//     phone_number: "",
//     role: "guest",
//   });
//   const [error, setError] = useState("");

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     try {
//       await register(form);
//       router.push("/signin");
//     } catch (err) {
//       if (err instanceof Error) {
//         setError(err.message);
//       } else {
//         setError("An unknown error occurred.");
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow-md p-8 rounded-lg w-full max-w-sm"
//       >
//         <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
//         {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
//         {["first_name", "last_name", "email", "password", "phone_number"].map(
//           (f) => (
//             <input
//               key={f}
//               name={f}
//               type={
//                 f === "password" ? "password" : f === "email" ? "email" : "text"
//               }
//               placeholder={f.replace("_", " ").toUpperCase()}
//               className="border p-2 w-full rounded mb-3"
//               value={(form as any)[f]}
//               onChange={handleChange}
//             />
//           )
//         )}
//         <button
//           type="submit"
//           className="bg-pink-600 text-white w-full py-2 rounded"
//         >
//           Sign Up
//         </button>
//         <p className="text-sm text-center mt-4">
//           Already have an account?{" "}
//           <a href="/signin" className="text-pink-600 hover:underline">
//             Sign In
//           </a>
//         </p>
//       </form>
//     </div>
//   );
// }

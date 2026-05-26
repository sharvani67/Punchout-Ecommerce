// import React, { useState } from "react";
// import logo from '@/assets/mainlogo.png';
// import axios from "axios";
// import BASE_URL from "@/Config/Api";
// import { Eye, EyeOff } from "lucide-react";


// const AdminLogin = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post(`${BASE_URL}/api/admin/login`, {
//         email,
//         password,
//       });

//       // ✅ store token
//       localStorage.setItem("token", res.data.token);

//       alert("Login successful ✅");

//       // ✅ redirect to dashboard
//       window.location.href = "/admin/productstable";

//     } catch (err: any) {
//       alert(err.response?.data?.message || "Login failed ❌");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#f4f6f9]">
//       <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">

//         {/* LOGO */}
//         <div className="flex flex-col items-center mb-6">
//           <img
//             src={logo}
//             alt="Admin Logo"
//             className="w-40 h-40 object-contain mb-2"
//           />
//           <h2 className="text-2xl font-bold text-[#0c2d67]">
//             Admin Login
//           </h2>
//           <p className="text-gray-500 text-sm">
//             Sign in to your account
//           </p>
//         </div>

//         {/* FORM */}
//         <form className="space-y-5" onSubmit={handleLogin}>

//           {/* EMAIL */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Email Address
//             </label>
//             <input
//               type="email"
//               placeholder="Enter your email"
//               className="w-full px-4 py-2 border rounded-lg"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>

//           {/* PASSWORD */}
//           <div>
//   <label className="block text-sm font-medium text-gray-700 mb-1">
//     Password
//   </label>

//   <div className="relative">
//     <input
//       type={showPassword ? "text" : "password"}
//       placeholder="Enter your password"
//       className="w-full px-4 py-2 border rounded-lg pr-10"
//       value={password}
//       onChange={(e) => setPassword(e.target.value)}
//     />

//     {/* Eye Icon */}
//     <button
//       type="button"
//       onClick={() => setShowPassword(!showPassword)}
//       className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
//     >
//       {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//     </button>
//   </div>
// </div>

//           {/* REMEMBER + FORGOT */}
//           <div className="flex justify-between items-center text-sm">
//             <label className="flex items-center gap-2">
//               <input type="checkbox" />
//               Remember me
//             </label>
//             <a href="/forgot-password" className="text-[#0c2d67] hover:underline">
//               Forgot password?
//             </a>
//           </div>

//           {/* BUTTON */}
//           <button
//             type="submit"
//               className="w-full hidden sm:inline-flex justify-center items-center bg-gradient-to-r from-pink-500 via-yellow-400 to-blue-500 text-white border-0 shadow-lg hover:scale-105 transition py-2 rounded-lg font-semibold"
//           >
//             Login
//           </button>

//         </form>
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;





import React, { useState } from "react";
import logo from "@/assets/mainlogo.png";
import axios from "axios";
import BASE_URL from "@/Config/Api";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${BASE_URL}/api/admin/login`, {
        email,
        password,
      });

      // ✅ Store token
      localStorage.setItem("token", res.data.token);

      alert("Login successful ✅");

      // ✅ Redirect
      window.location.href = "/admin/productstable";
    } catch (err: any) {
      alert(err.response?.data?.message || "Login failed ❌");
    }
  };

  return (
    <div className="min-h-screen bg-[#e9e9e9] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl bg-white rounded-[30px] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">

        {/* LEFT SIDE IMAGE SECTION */}
        <div className="relative hidden lg:block p-6">
          <div className="relative h-full rounded-3xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop"
              alt="Travel"
              className="w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30"></div>

            {/* Content */}
            <div className="absolute bottom-10 left-8 right-8 text-white">
              <h1 className="text-4xl font-bold leading-tight mb-4">
                Your Adventure <br />
                Start Here
              </h1>

              <p className="text-sm text-gray-200 leading-6">
                Join thousands of travelers exploring beautiful destinations
                around the world with our premium experience.
              </p>

      
              <div className="flex gap-3 mt-6 flex-wrap">
                <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-xs">
                  🌍 Discover
                </span>

                <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-xs">
                  ✈️ Book
                </span>

                <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-xs">
                  ⭐ Explore
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE LOGIN FORM */}
        <div className="flex items-center justify-center p-8 lg:p-14">
          <div className="w-full max-w-md">

           

            {/* TOP SWITCH */}
            {/* <div className="flex justify-end gap-3 mb-8">
              <button className="px-4 py-1 rounded-full bg-red-500 text-white text-xs font-semibold shadow">
                Login
              </button>

              <button className="text-xs text-gray-500 font-medium">
                Register
              </button>
            </div> */}

            {/* LOGO */}
            <div className="flex items-center gap-3 mb-6">
              <img
                src={logo}
                alt="Logo"
                className="w-24 h-26 object-contain"
              />
              <br></br>

              <div>
                <h2 className="text-3xl font-bold text-gray-800">
                  Admin Login
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Sign in to continue your journey
                </p>
              </div>
            </div>

            {/* FORM */}
            <form onSubmit={handleLogin} className="space-y-5">

              {/* EMAIL */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-[#fafafa] outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* PASSWORD */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full h-12 px-4 pr-12 rounded-xl border border-gray-200 bg-[#fafafa] outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  {/* Eye Icon */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* REMEMBER + FORGOT */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-gray-600">
                  <input
                    type="checkbox"
                    className="accent-red-500"
                  />
                  Remember me
                </label>

                <a href="/forgot-password" className="text-[#0c2d67] hover:underline">
               Forgot password?
            </a>
              </div>

              {/* LOGIN BUTTON */}
              <button
  type="submit"
  className="w-full h-12 rounded-xl bg-red-500 text-white text-sm font-semibold shadow hover:bg-red-600 hover:scale-[1.02] transition-all duration-300"
>
  Let&apos;s Start Your Journey
        </button>
            </form>

            {/* FOOTER TEXT */}
            <p className="text-center text-sm text-gray-500 mt-8">
              Don&apos;t have an account?{" "}
              <span className="text-red-500 font-semibold cursor-pointer hover:underline">
                Register Now
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
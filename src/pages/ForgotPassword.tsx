// import React, { useState } from "react";
// import logo from "@/assets/mainlogo.png";
// import axios from "axios";
// import BASE_URL from "@/Config/Api";
// import { Eye, EyeOff } from "lucide-react";

// const ForgotPassword = () => {
//   const [step, setStep] = useState(1);
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const sendOtp = async () => {
//     try {
//       await axios.post(`${BASE_URL}/api/admin/forgot-password`, { email });
//       alert("OTP sent");
//       setStep(2);
//     } catch (err: any) {
//       alert(err.response?.data?.message);
//     }
//   };

//   const verifyOtp = async () => {
//     try {
//       await axios.post(`${BASE_URL}/api/admin/verify-otp`, { email, otp });
//       setStep(3);
//     } catch (err: any) {
//       alert(err.response?.data?.message);
//     }
//   };

//   const resetPassword = async () => {
//     if (password !== confirmPassword) {
//       return alert("Passwords do not match");
//     }

//     try {
//       await axios.post(`${BASE_URL}/api/admin/reset-password`, {
//         email,
//         password,
//       });

//       alert("Password reset successful");
//       window.location.href = "/admin";
//     } catch (err: any) {
//       alert(err.response?.data?.message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#f4f6f9]">
//       <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">

//         <div className="flex flex-col items-center mb-6">
//           <img src={logo} className="w-40 h-40 mb-2" />
//           <h2 className="text-2xl font-bold text-[#0c2d67]">
//             Forgot Password
//           </h2>
//         </div>

//         <div className="space-y-5">

//           {step === 1 && (
//             <>
//               <label>Email</label>
//               <input
//                 type="email"
//                 className="w-full px-4 py-2 border rounded-lg"
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <button onClick={sendOtp} className="w-full bg-blue-500 text-white py-2 rounded-lg">
//                 Send OTP
//               </button>
//             </>
//           )}

//           {step === 2 && (
//             <>
//               <label>OTP</label>
//               <input
//                 type="text"
//                 className="w-full px-4 py-2 border rounded-lg"
//                 onChange={(e) => setOtp(e.target.value)}
//               />
//               <button onClick={verifyOtp} className="w-full bg-green-500 text-white py-2 rounded-lg">
//                 Verify OTP
//               </button>
//             </>
//           )}

//           {step === 3 && (
//   <>
//     {/* NEW PASSWORD */}
//     <label className="block text-sm font-medium text-gray-700 mb-1">
//       New Password
//     </label>

//     <div className="relative mb-3">
//       <input
//         type={showPassword ? "text" : "password"}
//         className="w-full px-4 py-2 border rounded-lg pr-10"
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button
//         type="button"
//         onClick={() => setShowPassword(!showPassword)}
//         className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
//       >
//         {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//       </button>
//     </div>

//     {/* CONFIRM PASSWORD */}
//     <label className="block text-sm font-medium text-gray-700 mb-1">
//       Confirm Password
//     </label>

//     <div className="relative mb-3">
//       <input
//         type={showConfirmPassword ? "text" : "password"}
//         className="w-full px-4 py-2 border rounded-lg pr-10"
//         onChange={(e) => setConfirmPassword(e.target.value)}
//       />
//       <button
//         type="button"
//         onClick={() =>
//           setShowConfirmPassword(!showConfirmPassword)
//         }
//         className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
//       >
//         {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//       </button>
//     </div>

//     {/* BUTTON */}
//     <button
//       onClick={resetPassword}
//       className="w-full bg-purple-500 text-white py-2 rounded-lg font-semibold"
//     >
//       Reset Password
//     </button>
//   </>
// )}

//         </div>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;






import React, { useState } from "react";
import logo from "@/assets/mainlogo.png";
import axios from "axios";
import BASE_URL from "@/Config/Api";
import { Eye, EyeOff, Mail, ShieldCheck, Lock } from "lucide-react";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // SEND OTP
  const sendOtp = async () => {
    try {
      await axios.post(`${BASE_URL}/api/admin/forgot-password`, {
        email,
      });

      alert("OTP sent successfully");
      setStep(2);
    } catch (err: any) {
      alert(err.response?.data?.message);
    }
  };

  // VERIFY OTP
  const verifyOtp = async () => {
    try {
      await axios.post(`${BASE_URL}/api/admin/verify-otp`, {
        email,
        otp,
      });

      setStep(3);
    } catch (err: any) {
      alert(err.response?.data?.message);
    }
  };

  // RESET PASSWORD
  const resetPassword = async () => {
    if (password !== confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      await axios.post(`${BASE_URL}/api/admin/reset-password`, {
        email,
        password,
      });

      alert("Password reset successful");
      window.location.href = "/admin";
    } catch (err: any) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-gray-200">
        
        {/* LOGO */}
        <div className="flex flex-col items-center mb-8">
          <img
            src={logo}
            alt="logo"
            className="w-28 h-28 object-contain mb-3"
          />

          <h1 className="text-4xl font-extrabold text-black">
            Forgot Password?
          </h1>

          <p className="text-gray-500 mt-2 text-sm text-center">
            Enter your details to reset your password
          </p>
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <div className="space-y-6">
            
        <div className="relative mt-6">
  
  {/* FLOATING LABEL */}
  <label className="absolute -top-3 left-4 bg-white px-2 text-black text-[15px] font-semibold z-10">
    Email
  </label>

  {/* INPUT FIELD */}
  <div className="relative">
    <input
      type="email"
      placeholder="youremail@example.com"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full h-16 rounded-2xl border border-gray-300 bg-white px-5 pr-14 text-[18px] text-gray-700 shadow-sm outline-none transition-all duration-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
    />

    {/* RIGHT ICON */}
    <div className="absolute right-4 top-1/2 -translate-y-1/2">
      <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center border border-gray-200">
        <Mail size={18} className="text-gray-500" />
      </div>
    </div>
  </div>
    </div>

           <button
  onClick={sendOtp}
  className="w-full h-12 rounded-xl bg-red-500 text-white text-sm font-semibold shadow hover:bg-red-600 hover:scale-[1.02] transition-all duration-300"
>
  Send OTP
        </button>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="space-y-6">

            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                OTP Verification
              </label>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full h-14 rounded-xl border border-gray-300 bg-white px-4 pr-12 text-gray-700 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition"
                />

                <ShieldCheck
                  size={20}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
            </div>

            <button
              onClick={verifyOtp}
              className="w-full h-14 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold text-lg shadow-md hover:scale-[1.01] transition-all duration-300"
            >
              Verify OTP
            </button>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="space-y-5">

            {/* NEW PASSWORD */}
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                New Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-14 rounded-xl border border-gray-300 bg-white px-4 pr-12 text-gray-700 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Confirm Password
              </label>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  className="w-full h-14 rounded-xl border border-gray-300 bg-white px-4 pr-12 text-gray-700 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* RESET BUTTON */}
            <button
              onClick={resetPassword}
              className="w-full h-14 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-lg shadow-md hover:scale-[1.01] transition-all duration-300"
            >
              Reset Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;

// import { Link } from 'react-router-dom';
// import {
//   Mail,
//   Phone,
//   MapPin,
//   Linkedin,
//   Twitter,
//   Facebook,
//   Instagram,
//   ArrowRight
// } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import logo from '@/assets/logo.jpeg';

// export default function Footer() {
//   return (
//     <footer className="relative overflow-hidden">

//       {/* 🌈 BACKGROUND */}
//       <div className="absolute inset-0 bg-gradient-to-br from-pink-200 via-yellow-100 to-blue-200" />

//       {/* ✨ GLOW EFFECT */}
//       <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-pink-500/30 blur-3xl rounded-full" />
//       <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-blue-500/30 blur-3xl rounded-full" />

//       {/* 🔥 TOP BORDER */}
//       <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-pink-500 via-yellow-400 to-blue-500" />

//       {/* ================= NEWSLETTER ================= */}
//       <div className="relative border-b border-white/40 backdrop-blur-xl">
//         <div className="container mx-auto px-4 lg:px-8 py-16">
//           <div className="grid lg:grid-cols-2 gap-8 items-center">

//             <div>
//               <h3 className="text-3xl font-extrabold text-gray-900 mb-3">
//                 Stay Ahead of the Curve 🚀
//               </h3>
//               <p className="text-gray-700 text-lg">
//                 Insights on IT infrastructure, security updates & exclusive offers.
//               </p>
//             </div>

//             <div className="flex gap-3">
//               <Input
//                 placeholder="Enter your email"
//                 className="h-12 flex-1 bg-white/90 border border-white shadow-md"
//               />
//               <Button className="bg-gradient-to-r from-pink-500 via-yellow-400 to-blue-500 text-white h-12 px-6 shadow-xl hover:scale-110 transition-all">
//                 Subscribe <ArrowRight size={16} />
//               </Button>
//             </div>

//           </div>
//         </div>
//       </div>

//       {/* ================= MAIN FOOTER ================= */}
//       <div className="relative container mx-auto px-4 lg:px-8 py-16">

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

//           {/* BRAND */}
//           <div>
//             <img
//               src={logo}
//               alt="MV Branding"
//               className="h-36 w-auto drop-shadow-2xl mb-4 ml-12"
//             />

//             <p className="text-sm text-gray-700 leading-relaxed mb-6">
//               Customer Centricity with Peace of Mind. Building Data Cabling & Data Security as the Strategic Core for enterprise transformation.
//             </p>

//             {/* 🌍 SOCIAL MEDIA (OFFICIAL COLORS) */}
//             <div className="flex gap-3">

//               {/* LinkedIn */}
//               <a
//                 href="#"
//                 target="_blank"
//                 className="p-3 rounded-xl bg-[#0077B5] text-white shadow-lg hover:scale-110 hover:shadow-[0_0_15px_rgba(0,119,181,0.6)] transition"
//               >
//                 <Linkedin size={18} />
//               </a>

//               {/* Twitter */}
//               <a
//                 href="#"
//                 target="_blank"
//                 className="p-3 rounded-xl bg-[#1DA1F2] text-white shadow-lg hover:scale-110 hover:shadow-[0_0_15px_rgba(29,161,242,0.6)] transition"
//               >
//                 <Twitter size={18} />
//               </a>

//               {/* Facebook */}
//               <a
//                 href="#"
//                 target="_blank"
//                 className="p-3 rounded-xl bg-[#1877F2] text-white shadow-lg hover:scale-110 hover:shadow-[0_0_15px_rgba(24,119,242,0.6)] transition"
//               >
//                 <Facebook size={18} />
//               </a>

//               {/* Instagram */}
//               <a
//                 href="#"
//                 target="_blank"
//                 className="p-3 rounded-xl bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white shadow-lg hover:scale-110 hover:shadow-[0_0_15px_rgba(236,72,153,0.6)] transition"
//               >
//                 <Instagram size={18} />
//               </a>

//             </div>
//           </div>

//           {/* QUICK LINKS */}
//           <div>
//             <h4 className="font-bold text-gray-900 mb-5 text-lg">Quick Links</h4>
//             <div className="flex flex-col gap-3">
//               {[
//                 ['/', 'Home'],
//                 ['/about', 'About Us'],
//                 ['/projectpage', 'Projects'],
//                 ['/oursolution', 'Solutions'],
//                 ['/whyus', 'Why Us'],
//                 ['/contact', 'Contact']
//               ].map(([path, label]) => (
//                 <Link
//                   key={path}
//                   to={path}
//                   className="text-sm text-gray-700 hover:text-pink-600 transition flex items-center gap-2 group"
//                 >
//                   <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition" />
//                   {label}
//                 </Link>
//               ))}
//             </div>
//           </div>

//           {/* SERVICES */}
//           <div>
//             <h4 className="font-bold text-gray-900 mb-5 text-lg">Services</h4>
//             <div className="flex flex-col gap-3 text-sm text-gray-700">
//               {[
//                 'Data Cabling Infrastructure',
//                 'Data Security Solutions',
//                 'End-to-End IT Deployment',
//                 'Strategic IT Core Development',
//                 'IT Consulting',
//                 'Cloud Solutions'
//               ].map(service => (
//                 <Link
//                   key={service}
//                   to="/services"
//                   className="hover:text-blue-600 transition flex items-center gap-2 group"
//                 >
//                   <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition" />
//                   {service}
//                 </Link>
//               ))}
//             </div>
//           </div>

//           {/* CONTACT */}
//       <div>
//   <h4 className="font-bold text-gray-900 mb-5 text-lg">Contact</h4>
//   <div className="flex flex-col gap-5 text-sm text-gray-700">

//     {/* EMAIL */}
//     <div className="flex items-start gap-3">
//       <div className="w-11 h-11 rounded-xl bg-pink-500 flex items-center justify-center">
//         <Mail size={20} className="text-white" />
//       </div>
//       <div>
//         <div className="text-xs">Email</div>
//         <span className="font-medium text-gray-900">venkatesh@mvbsolutions.com</span>
//       </div>
//     </div>

//     {/* PHONE */}
//     <div className="flex items-start gap-3">
//       <div className="w-11 h-11 rounded-xl bg-yellow-500 flex items-center justify-center">
//         <Phone size={20} className="text-white" />
//       </div>
//       <div>
//         <div className="text-xs">Phone</div>
//         <span className="font-medium text-gray-900">+91 9686521214</span>
//       </div>
//     </div>

//     {/* ADDRESS */}
//     <div className="flex items-start gap-3">
//       <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center">
//         <MapPin size={20} className="text-white" />
//       </div>
//       <div>
//         <div className="text-xs">Address</div>
//         <span className="font-medium text-gray-900">
//           P.N. Shetty Complex, Akshayanagar, Bengaluru
//         </span>
//       </div>
//     </div>

//   </div>
//       </div>
//         </div>

//         {/* ================= BOTTOM ================= */}
//         <div className="border-t border-white/50 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">

//           <p className="text-sm text-gray-700">
//             © {new Date().getFullYear()} MV Business Solutions. All rights reserved.
//           </p>

//           <div className="flex gap-6 text-sm text-gray-700">
//             <a href="#" className="hover:text-pink-600 transition">Privacy Policy</a>
//             <a href="#" className="hover:text-yellow-600 transition">Terms of Service</a>
//             <a href="#" className="hover:text-blue-600 transition">Cookie Policy</a>
//           </div>

//         </div>
//       </div>
//     </footer>
//   );
// }






import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  ArrowRight,
  Award,
  Users,
  Clock,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import logo from '@/assets/mainlogo.png';

export default function Footer() {
  // Simplified data
  const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/services', label: 'Services' },
    { path: '/contact', label: 'Contact' }
  ];

  const services = [
    'IT Consulting',
    'Cloud Solutions',
    'Network Security',
    'Data Protection'
  ];

  const socialLinks = [
    { Icon: Linkedin, href: '#', bg: '#0077B5' },
    { Icon: Twitter, href: '#', bg: '#1DA1F2' },
    { Icon: Facebook, href: '#', bg: '#1877F2' },
    { Icon: Instagram, href: '#', bg: 'linear-gradient(135deg, #FACC15, #E11D48, #C026D3)' }
  ];

  

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-gray-50">
      {/* Decorative glow */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-[#E11D48]/10 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#2563EB]/10 blur-3xl rounded-full" />

      {/* Top border */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#E11D48] via-[#FACC15] to-[#2563EB]" />

     

   
    

      {/* Main Footer */}
      <div className="relative container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand */}
          <div>
            <img src={logo} alt="Logo" className="h-24 w-auto mb-3" />
            <p className="text-sm text-gray-600 mb-4">
              Customer centric IT solutions for enterprise transformation.
            </p>
            <div className="flex gap-2">
              {socialLinks.map(({ Icon, href, bg }, i) => (
                <a
                  key={i}
                  href={href}
                  className="p-2 rounded-lg text-white hover:scale-110 transition"
                  style={{ background: bg }}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map(({ path, label }) => (
                <li key={path}>
                  <Link to={path} className="text-sm text-gray-600 hover:text-[#E11D48] transition flex items-center gap-1">
                    <ArrowRight size={10} /> {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Services</h4>
            <ul className="space-y-2">
              {services.map(service => (
                <li key={service}>
                  <Link to="/services" className="text-sm text-gray-600 hover:text-[#2563EB] transition flex items-center gap-1">
                    <ArrowRight size={10} /> {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#E11D48] flex items-center justify-center">
                  <Mail size={12} className="text-white" />
                </div>
                <span className="text-sm">hello@company.com</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#F97316] flex items-center justify-center">
                  <Phone size={12} className="text-white" />
                </div>
                <span className="text-sm">+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#2563EB] flex items-center justify-center">
                  <MapPin size={12} className="text-white" />
                </div>
                <span className="text-sm">Bengaluru, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-8 pt-4 text-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} MV Business Solutions. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
import { ShieldX } from "lucide-react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center">

        <div className="flex justify-center mb-6">
          <div className="bg-red-100 p-4 rounded-full">
            <ShieldX className="h-12 w-12 text-red-600" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Access Denied
        </h1>

        <p className="text-gray-600 mb-6">
          This application can only be accessed through a valid PunchOut
          session.
        </p>

        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
          <p className="text-sm text-orange-700">
            Please launch the catalog from your procurement system and try
            again.
          </p>
        </div>

        {/* <Link
          to="/"
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-orange-500 text-white font-medium hover:bg-orange-600 transition"
        >
          Go Back
        </Link> */}

      </div>
    </div>
  );
};

export default Unauthorized;
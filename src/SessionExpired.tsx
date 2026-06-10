// pages/SessionExpired.tsx
import { Clock } from "lucide-react";

const SessionExpired = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center">

        <div className="flex justify-center mb-6">
          <div className="bg-red-100 p-4 rounded-full">
            <Clock className="h-12 w-12 text-red-600" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Session Expired
        </h1>

        <p className="text-gray-600 mb-6">
          Your PunchOut session has timed out due to inactivity.
        </p>

        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
          <p className="text-sm text-red-700">
            Please return to your procurement system and start a new session.
          </p>
        </div>

      </div>
    </div>
  );
};

export default SessionExpired;
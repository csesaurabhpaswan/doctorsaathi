import React, { useEffect } from "react";
import { XCircle } from "lucide-react";

const CancelPage = () => {
  useEffect(() => {
    // Optional small vibration or focus animation could go here if needed later
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-gray-50 flex flex-col items-center justify-center px-4 overflow-hidden relative">
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); opacity: 1; }
          50% { transform: translateY(-30px) rotate(10deg); opacity: 0.8; }
          100% { transform: translateY(0px) rotate(0deg); opacity: 1; }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-8px); }
          40%, 80% { transform: translateX(8px); }
        }

        .floating-x {
          animation: float 3s ease-in-out infinite;
        }

        .shake {
          animation: shake 0.8s ease-in-out;
        }
      `}</style>

      {/* Floating Red X Icons */}
      {[...Array(6)].map((_, i) => (
        <XCircle
          key={i}
          className="absolute text-red-300 opacity-40"
          style={{
            top: `${Math.random() * 90}%`,
            left: `${Math.random() * 90}%`,
            width: `${Math.random() * 40 + 20}px`,
            height: `${Math.random() * 40 + 20}px`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}

      {/* Main Icon */}
      <div className="relative z-10 mb-6">
        <XCircle className="w-24 h-24 text-red-500 animate-bounce shake drop-shadow-lg" />
      </div>

      {/* Heading */}
      <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center relative z-10 animate-fade-in">
        Payment Cancelled
      </h1>

      {/* Description */}
      <p className="text-gray-600 text-lg text-center max-w-md mb-6 relative z-10">
        Looks like you canceled your donation. No problem — you can always try
        again and continue supporting healthcare for those in need.
      </p>

      {/* Retry Button */}
      <a
        href="/donate"
        className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-8 rounded-xl font-semibold hover:scale-105 transition-transform shadow-md relative z-10"
      >
        Try Again
      </a>
    </div>
  );
};

export default CancelPage;

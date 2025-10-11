import React, { useEffect } from "react";
import { CheckCircle } from "lucide-react";
import confetti from "canvas-confetti";

const SuccessPage = () => {
  useEffect(() => {
    // Confetti Burst
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#6366F1", "#3B82F6", "#FACC15", "#22C55E"],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#6366F1", "#3B82F6", "#FACC15", "#22C55E"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex flex-col items-center justify-center px-4">
      {/* Coin Animation */}
      <div className="relative w-32 h-32 mb-8">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-8 h-8 bg-yellow-400 rounded-full animate-bounce"
            style={{
              left: `${Math.random() * 80}%`,
              top: `${Math.random() * 80}%`,
              animationDelay: `${Math.random()}s`,
              opacity: 0.8,
              boxShadow: "0 0 10px rgba(255,215,0,0.6)",
            }}
          ></div>
        ))}
        <CheckCircle className="absolute inset-0 m-auto w-20 h-20 text-green-500 drop-shadow-lg animate-pulse" />
      </div>

      <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
        Payment Successful!
      </h1>
      <p className="text-gray-600 text-lg text-center max-w-md mb-6">
        Thank you for your generous donation. Your contribution will directly
        support our healthcare initiatives and help those in need.
      </p>

      <a
        href="/"
        className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-8 rounded-xl font-semibold hover:scale-105 transition-transform shadow-md"
      >
        Back to Home
      </a>
    </div>
  );
};

export default SuccessPage;

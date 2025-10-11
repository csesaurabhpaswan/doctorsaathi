import React, { useState } from "react";
import { Heart, Users, Star, Check, Loader2 } from "lucide-react";

export default function DonationPage() {
  const [amount, setAmount] = useState("");
  const [donorInfo, setDonorInfo] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    setError("");
  };

  const handleInputChange = (e) => {
    setDonorInfo({
      ...donorInfo,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleDonate = async (e) => {
    e.preventDefault();

    // Convert string to number safely
    const finalAmount = Number(amount);

    // Validate amount correctly
    if (!finalAmount || isNaN(finalAmount) || finalAmount <= 0) {
      setError("Please enter a valid donation amount greater than ₹0");
      return;
    }

    if (!donorInfo.email || !donorInfo.email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setError("");
    setLoading(true);
    console.log(donorInfo)

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/payment`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: finalAmount,
            fullName: donorInfo.name,
            email: donorInfo.email,
            message: donorInfo.message || "",
          }),
        }
      );

      if (!response.ok) throw new Error("Payment failed. Please try again.");

      const data = await response.json();

      // Redirect to payment URL if provided
      if (data.url) {
        window.location.href = data.url;
      }

      setShowSuccess(true);

      // Reset form
      setAmount("");
      setDonorInfo({ name: "", email: "", message: "" });

      // Hide success after 5 sec
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-opacity-20 rounded-full mb-6 backdrop-blur-sm">
            <Heart className="w-10 h-10" fill="currentColor" />
          </div>
          <h1 className="text-5xl font-bold mb-4">Make a Difference Today</h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">
            Your generosity helps us provide quality healthcare to those in
            need. Every contribution counts.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 -mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Donation Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Enter Your Donation Amount
              </h2>

              {/* Amount Input */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Donation Amount *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold text-xl">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={amount}
                    onChange={handleAmountChange}
                    placeholder="Enter amount"
                    min="1"
                    className="w-full pl-10 pr-4 py-4 text-xl border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-100 transition-colors"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Enter any amount you wish to donate
                </p>
              </div>

              {/* Donor Information */}
              <div className="space-y-4 mb-8">
                <h3 className="text-lg font-semibold text-gray-800">
                  Your Information
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={donorInfo.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={donorInfo.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message (Optional)
                  </label>
                  <textarea
                    name="message"
                    value={donorInfo.message}
                    onChange={handleInputChange}
                    placeholder="Share why you're donating..."
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors resize-none"
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-4 bg-red-50 border-2 border-red-300 rounded-xl">
                  <p className="text-red-700 font-medium text-center">
                    {error}
                  </p>
                </div>
              )}

              {/* Success Message */}
              {showSuccess && (
                <div className="mb-4 p-4 bg-green-50 border-2 border-green-300 rounded-xl">
                  <p className="text-green-700 font-medium text-center flex items-center justify-center gap-2">
                    <Check className="w-5 h-5" />
                    Thank you! Your donation has been processed successfully.
                  </p>
                </div>
              )}

              {/* Donate Button */}
              <button
                onClick={handleDonate}
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Heart className="w-5 h-5" fill="currentColor" />
                    Donate Now
                  </>
                )}
              </button>

              <p className="text-center text-sm text-gray-500 mt-4">
                Your donation is secure and tax-deductible
              </p>
            </div>
          </div>

          {/* Impact Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Impact Stats */}
            <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Your Impact
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <Users className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">₹500</p>
                    <p className="text-sm text-gray-600">
                      Provides basic medical care for 1 patient
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Heart className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">₹1000</p>
                    <p className="text-sm text-gray-600">
                      Covers medication for 5 patients
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Star className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">₹5000</p>
                    <p className="text-sm text-gray-600">
                      Funds a complete health checkup camp
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits Card */}
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl shadow-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Why Donate?</h3>

              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">100% transparent fund utilization</p>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Direct impact on patient care</p>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Tax benefits under 80G</p>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Regular impact updates</p>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                Trusted By
              </h3>
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-purple-600">
                  10,000+
                </div>
                <div className="text-sm text-gray-600">Happy Donors</div>
                <div className="text-3xl font-bold text-blue-600 mt-4">
                  ₹50L+
                </div>
                <div className="text-sm text-gray-600">Raised This Year</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="max-w-6xl mx-auto px-4 py-12 mt-12">
        <div className="text-center">
          <p className="text-gray-600 mb-2">Have questions about donating?</p>
          <a
            href="mailto:team.servana@gmail.com"
            className="text-purple-600 font-semibold hover:underline"
          >
            Contact our support team
          </a>
        </div>
      </div>
    </div>
  );
}

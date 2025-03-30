import { useState } from "react";
import bg_1 from "./images/bg1.jpg";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      const response = await fetch("http://localhost:5000/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Something went wrong");
  
      // ✅ Console log data to check what is received from the server
      console.log("Received data:", data);
  
      // ✅ Ensure backend sends user details
      const user = {
        name: data.name, // Make sure backend sends `name`
        email: data.email,
      };
  
      // ✅ Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(user));
  
      setSuccess("Login successful! Redirecting...");
      setFormData({ email: "", password: "" });
  
      // ✅ Redirect to Home Page
      navigate("/home", { state: { user } });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center font-pop"
      style={{ backgroundImage: `url(${bg_1})` }}
    >
      <div className="bg-customGreen shadow-lg rounded-2xl p-8 w-full max-w-md backdrop-blur-md bg-opacity-80">
        <h2 className="text-2xl font-bold text-center text-white mb-6">Login</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {success && <p className="text-green-500 text-sm text-center">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white p-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white p-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-customRed text-white p-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200"
            disabled={loading}
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-4">
          Don't have an account?{" "}
          <span className="text-white hover:underline cursor-pointer" onClick={() => navigate("/signup")}>
            Signup
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;

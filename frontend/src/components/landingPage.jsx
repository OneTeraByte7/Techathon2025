import React from 'react';
import img1 from './images/img1.png';
import img2 from './images/img2.png';
import bg1 from './images/bg1.jpg';
import { useNavigate } from 'react-router-dom';

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="font-pop bg-cover bg-center min-h-screen flex flex-col"
      style={{ backgroundImage: `url(${bg1})` }}
    >
      {/* Header */}
     

      {/* Main Content */}
      <main className="flex flex-col items-center w-full flex-grow">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row justify-between items-center gap-8 w-3/4 min-h-screen py-10">
          <div className="flex-1 bg-white bg-opacity-70 p-8 rounded-lg shadow-lg">
            <h3 className="text-3xl mb-6 text-customGreen font-semibold">
              Welcome to <span className="text-5xl text-customRed font-bold">MEDBuddy</span>
            </h3>
            <p className="text-lg text-gray-700">
              Our platform ensures you never miss a dose, appointment, or health checkup with timely SMS and call reminders.
            </p>
            <div className="mt-8 flex gap-4">
              <button className="px-6 py-3 bg-customGreen text-white rounded-lg shadow-lg hover:bg-green-700 transition"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button className="px-6 py-3 bg-customRed text-white rounded-lg shadow-lg hover:bg-red-700 transition"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </button>
            </div>
          </div>
          <div className="flex-1">
            <img src={img1} alt="Healthcare app" className="w-full h-auto rounded-lg shadow-lg" />
          </div>
        </section>

        {/* Vision & Mission Section */}
        <section className="flex flex-col md:flex-row justify-between items-center gap-8 w-3/4 min-h-screen py-10">
          <div className="flex-1">
            <img src={img2} alt="Healthcare tracking" className="w-full h-auto rounded-lg shadow-lg" />
          </div>
          <div className="flex-1 bg-white bg-opacity-70 p-8 rounded-lg shadow-lg">
            <h3 className="text-3xl text-customRed font-bold mb-4">Our Vision</h3>
            <p className="text-lg text-gray-700">
              To create a healthier, more proactive society by leveraging technology to provide timely health reminders for all.
            </p>
            <h3 className="text-3xl text-customRed font-bold mt-6 mb-4">Our Mission</h3>
            <p className="text-lg text-gray-700">
              To provide a seamless, user-friendly health reminder system that reduces missed medical events and enhances overall well-being.
            </p>
            <h3 className="text-3xl text-customRed font-bold mt-6">
              Join us in our mission.
            </h3>
            <div className="mt-6 flex justify-center">
              <button className="px-6 py-3 bg-customRed text-white rounded-lg shadow-lg hover:bg-red-700 transition"
                onClick={() => navigate('/signup')}
              >
                Get Started
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full p-5 bg-white shadow-md flex justify-center">
        <p className="text-gray-600">© 2025 MEDBbuddy. All rights reserved.</p>
      </footer>
    </div>
  );
};

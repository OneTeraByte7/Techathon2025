import React from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement);

const patientData = [
  { Name: "Rahul Sharma", Age: 34, Weight: 72, "Next Checkup": "2023-10-15", Symptoms: "Fatigue, frequent urination" },
  { Name: "Priya Patel", Age: 28, Weight: 58, "Next Checkup": "2023-10-16", Symptoms: "High blood pressure, headaches" },
  { Name: "Amit Singh", Age: 45, Weight: 85, "Next Checkup": "2023-10-17", Symptoms: "Joint pain, swelling" },
  { Name: "Sneha Gupta", Age: 30, Weight: 62, "Next Checkup": "2023-10-18", Symptoms: "Shortness of breath, wheezing" },
  { Name: "Vijay Kumar", Age: 50, Weight: 90, "Next Checkup": "2023-10-19", Symptoms: "Chest pain, dizziness" },
];

// Pie chart data for symptom distribution
const symptomsData = patientData.reduce((acc, patient) => {
  patient.Symptoms.split(", ").forEach((symptom) => {
    acc[symptom] = (acc[symptom] || 0) + 1;
  });
  return acc;
}, {});

const pieData = {
  labels: Object.keys(symptomsData),
  datasets: [
    {
      data: Object.values(symptomsData),
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#F6A6B2"],
      hoverOffset: 4,
    },
  ],
};

// Histogram data for age distribution
const ageData = patientData.map((patient) => patient.Age);

const histogramData = {
  labels: ["<30", "30-40", "40-50", "50+"],
  datasets: [
    {
      label: "Age Distribution",
      data: [
        ageData.filter((age) => age < 30).length,
        ageData.filter((age) => age >= 30 && age <= 40).length,
        ageData.filter((age) => age >= 40 && age <= 50).length,
        ageData.filter((age) => age > 50).length,
      ],
      backgroundColor: "#FF6347",
      borderColor: "#FF4500",
      borderWidth: 1,
    },
  ],
};

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">Patient Dashboard</h1>

      {/* Patient Table */}
      <div className="overflow-x-auto mb-8">
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Age</th>
              <th className="py-2 px-4 border">Weight</th>
              <th className="py-2 px-4 border">Next Checkup</th>
              <th className="py-2 px-4 border">Symptoms</th>
            </tr>
          </thead>
          <tbody>
            {patientData.map((patient, index) => (
              <tr key={index} className="text-center border">
                <td className="py-2 px-4 border">{patient.Name}</td>
                <td className="py-2 px-4 border">{patient.Age}</td>
                <td className="py-2 px-4 border">{patient.Weight} kg</td>
                <td className="py-2 px-4 border">{patient["Next Checkup"]}</td>
                <td className="py-2 px-4 border">{patient.Symptoms}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pie Chart - Symptoms Distribution */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Symptom Distribution</h2>
        <div className="w-full" style={{ height: "400px", maxWidth: "800px", margin: "0 auto" }}>
          <Pie data={pieData} options={{ responsive: true }} />
        </div>
      </div>

      {/* Histogram - Age Distribution */}
      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Age Distribution</h2>
        <div className="w-full" style={{ height: "400px", maxWidth: "800px", margin: "0 auto" }}>
          <Bar data={histogramData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

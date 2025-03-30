import React, { useState, useEffect } from "react";
import axios from "axios";

const HospitalList = () => {
  const [hospitals, setHospitals] = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState([]);
  const [location, setLocation] = useState("");
  const [disease, setDisease] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await axios.get("/Hospital_name.json"); // Fetch from public folder
        setHospitals(response.data);
        setFilteredHospitals(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  useEffect(() => {
    const filteredHospitals = hospitals.filter((hospital) =>
      (hospital.Location?.toLowerCase() || "").includes(location.toLowerCase()) &&
      (hospital.Disease?.toLowerCase() || "").includes(disease.toLowerCase())
    );

    setFilteredHospitals(filteredHospitals);
  }, [location, disease, hospitals]);

  const handleLocationChange = (e) => setLocation(e.target.value);
  const handleDiseaseChange = (e) => setDisease(e.target.value);

  if (loading) return <p className="text-green-500">Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 border border-gray-300 rounded-lg bg-gray-50 mt-16 font-pop">
      <h1 className="text-2xl font-bold mb-4 text-green-600">Hospital List</h1>

      <div className="mb-4">
        <label htmlFor="location" className="block mb-2 font-bold">Location:</label>
        <input
          type="text"
          id="location"
          className="w-full p-2 border border-gray-300 rounded"
          value={location}
          onChange={handleLocationChange}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="disease" className="block mb-2 font-bold">Disease:</label>
        <input
          type="text"
          id="disease"
          className="w-full p-2 border border-gray-300 rounded"
          value={disease}
          onChange={handleDiseaseChange}
        />
      </div>

      <table className="table-auto w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Hospital Name</th>
            <th className="px-4 py-2">Location</th>
            <th className="px-4 py-2">Disease</th>
          </tr>
        </thead>
        <tbody>
          {filteredHospitals.length > 0 ? (
            filteredHospitals.map((hospital, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{hospital["Hospital Name"]}</td>
                <td className="border px-4 py-2">{hospital.Location}</td>
                <td className="border px-4 py-2">{hospital.Disease}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center py-4">No hospitals found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HospitalList;

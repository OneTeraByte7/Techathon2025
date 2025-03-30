import React, { useState } from 'react';
import axios from 'axios';

const PatientForm = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');
    const [nextCheckup, setNextCheckup] = useState('');
    const [symptoms, setSymptoms] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/add-patient', {
                name,
                age,
                weight,
                nextCheckup,
                symptoms
            });
            setStatus(`Patient details added successfully: ${response.data.patientId}`);
        } catch (error) {
            setStatus(`Error adding patient details: ${error.message}`);
        }
    };

    return (
        <div className="container max-w-lg mx-auto p-4 mt-16 font-pop">
            <h1 className="text-2xl font-bold mb-4 text-customGreen">Add Patient Details</h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                        Name:
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="age" className="block text-gray-700 text-sm font-bold mb-2">
                        Age:
                    </label>
                    <input
                        type="number"
                        id="age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="weight" className="block text-gray-700 text-sm font-bold mb-2">
                        Weight:
                    </label>
                    <input
                        type="number"
                        id="weight"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="nextCheckup" className="block text-gray-700 text-sm font-bold mb-2">
                        Next Checkup:
                    </label>
                    <input
                        type="date"
                        id="nextCheckup"
                        value={nextCheckup}
                        onChange={(e) => setNextCheckup(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="symptoms" className="block text-gray-700 text-sm font-bold mb-2">
                        Symptoms:
                    </label>
                    <textarea
                        id="symptoms"
                        value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <button type="submit" className="bg-customGreen hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Add Patient
                </button>
            </form>
            {status && <p className={`text-${status.includes('successfully') ? 'customGreen' : 'customRed'} mt-4`}>{status}</p>}
        </div>
    );
};

export default PatientForm;

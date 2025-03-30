import React, { useState } from 'react';
import axios from 'axios';

const CallForm = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    const validatePhoneNumber = (number) => {
        const phoneRegex = /^\+?[1-9]\d{1,14}$/;
        return phoneRegex.test(number);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validatePhoneNumber(phoneNumber)) {
            setStatus('Invalid phone number format. Please enter a valid phone number.');
            return;
        }
        setLoading(true);
        setStatus('');
        try {
            const response = await axios.post('http://localhost:8080/make-call', { phoneNumber });
            setStatus(`Call initiated: ${response.data.sid}`);
        } catch (error) {
            setStatus(`Error initiating call: ${error.response ? error.response.data.error : error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 border border-gray-300 rounded-lg bg-gray-50 mt-16 font-pop">
            <h1 className="text-2xl font-bold mb-4 text-customGreen">Twilio Call System</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="phoneNumber" className="block mb-2 font-bold">Phone Number:</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={phoneNumber}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className={`w-full py-2 px-4 rounded text-white ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-customGreen hover:bg-green-700'}`}
                    disabled={loading}
                >
                    {loading ? 'Making Call...' : 'Make Call'}
                </button>
            </form>
            {status && <p className={`mt-4 ${status.includes('Error') ? 'text-customRed' : 'text-customGreen'}`}>{status}</p>}
        </div>
    );
};

export default CallForm;
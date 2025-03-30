import React, { useState } from 'react';
import axios from 'axios';

const SOSForm = () => {
    const [phoneNumber, setPhoneNumber] = useState('+919175587139');
    const [status, setStatus] = useState('');

  
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/send-sos', { phoneNumber });
            setStatus(`SOS sent successfully: ${response.data.message}`);
        } catch (error) {
            setStatus(`Error sending SOS: ${error.message}`);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 border border-gray-300 rounded-lg bg-gray-50 mt-16 font-pop">
            
            <form onSubmit={handleSubmit} className='flex justify-center items-center flex-col'>
            <h1 className="text-2xl font-bold mb-4 text-customGreen">Send SOS Notification</h1>
                <button
                    type="submit"
                    className="w-40 h-40  py-2 px-4 rounded-full text-white bg-customGreen hover:bg-green-700"
                >
                    Send SOS
                </button>
            </form>
            {status && <p className={`mt-4 ${status.includes('Error') ? 'text-customRed' : 'text-customGreen'}`}>{status}</p>}
        </div>
    );
};

export default SOSForm;
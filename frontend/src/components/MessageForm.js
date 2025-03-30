import React, { useState } from 'react';
import axios from 'axios';

const MessageForm = () => {
    const [phoneNumbers, setPhoneNumbers] = useState('');
    const [messageBody, setMessageBody] = useState('');
    const [status, setStatus] = useState('');

    const handlePhoneNumbersChange = (e) => {
        setPhoneNumbers(e.target.value);
    };

    const handleMessageBodyChange = (e) => {
        setMessageBody(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const numbersArray = phoneNumbers.split(',').map(number => number.trim());
        try {
            const response = await axios.post('http://localhost:8080/send-messages', {
                phoneNumbers: numbersArray,
                messageBody
            });
            setStatus(`Messages sent successfully: ${response.data.success}`);
        } catch (error) {
            setStatus(`Error sending messages: ${error.message}`);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 border border-gray-300 rounded-lg bg-gray-50 mt-16 font-pop">
            <h1 className="text-2xl font-bold mb-4 text-customGreen">Send Messages</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="phoneNumbers" className="block mb-2 font-bold">Phone Numbers (comma separated):</label>
                    <input
                        type="text"
                        id="phoneNumbers"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={phoneNumbers}
                        onChange={handlePhoneNumbersChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="messageBody" className="block mb-2 font-bold">Message Body:</label>
                    <textarea
                        id="messageBody"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={messageBody}
                        onChange={handleMessageBodyChange}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 rounded text-white bg-customGreen hover:bg-green-700"
                >
                    Send Messages
                </button>
            </form>
            {status && <p className={`mt-4 ${status.includes('Error') ? 'text-customRed' : 'text-customGreen'}`}>{status}</p>}
        </div>
    );
};

export default MessageForm;
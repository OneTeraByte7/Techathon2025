import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CallLogs = () => {
    const [callLogs, setCallLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCallLogs = async () => {
            try {
                const response = await axios.get('http://localhost:8080/call-logs');
                setCallLogs(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchCallLogs();
    }, []);

    if (loading) {
        return <p className="text-customGreen">Loading...</p>;
    }

    if (error) {
        return <p className="text-customRed">Error: {error}</p>;
    }

    return (
        <div className="max-w-4xl p-4  font-pop">
            <h1 className="text-2xl font-bold mb-4 text-customGreen">Call Logs</h1>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Call SID</th>
                        <th className="px-4 py-2">From</th>
                        <th className="px-4 py-2">To</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Start Time</th>
                        <th className="px-4 py-2">End Time</th>
                        <th className="px-4 py-2">Duration</th>
                    </tr>
                </thead>
                <tbody>
                    {callLogs.map(call => (
                        <tr key={call.sid} className="hover:bg-gray-100">
                            <td className="border px-4 py-2">{call.sid}</td>
                            <td className="border px-4 py-2">{call.from}</td>
                            <td className="border px-4 py-2">{call.to}</td>
                            <td className="border px-4 py-2">{call.status}</td>
                            <td className="border px-4 py-2">{call.start_time}</td>
                            <td className="border px-4 py-2">{call.end_time}</td>
                            <td className="border px-4 py-2">{call.duration}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CallLogs;
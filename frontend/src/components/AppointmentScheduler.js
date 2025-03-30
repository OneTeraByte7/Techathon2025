import React, { useState } from 'react';
import axios from 'axios';


const AppointmentScheduler = () => {
  const [number, setnumber] = useState('');
  const [name, setname] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/schedule-appointment', { number, date ,name});
      setStatus('Appointment scheduled successfully.');
    } catch (error) {
      console.error('Error scheduling appointment:', error);
      setStatus(`Error scheduling appointment: ${error.response ? error.response.data : error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4  font-pop" >
      <div className="mb-4">
        
      <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
  Name
</label>
<input 
  list="nameList" 
  value={name} 
  onChange={(e) => setname(e.target.value)} 
  required 
  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
/>
<datalist id="nameList">
  <option value="Dr Kapil Raj Thevar" />
  <option value="Dr Soham suryawanshi" />
  <option value="Dr Rohit" />
  <option value="Dr ABhishek" />
  
</datalist>
</div>
<div className="mb-4">
        <label htmlFor="text" className="block text-gray-700 text-sm font-bold mb-2">
          Number
        </label>
        <input
          type="number"
          id="number"
          value={number}
          onChange={(e) => setnumber(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        
      </div>
      <div className="mb-4">
        <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">
          Date:
        </label>
        <input
          type="datetime-local"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Schedule Appointment
      </button>
      {status && <p className={`mt-4 ${status.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>{status}</p>}
    </form>
  );
};

export default AppointmentScheduler;

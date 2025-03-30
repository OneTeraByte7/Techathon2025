import React, { useState } from 'react';

const GoogleTranslate = () => {
  const [translatedText, setTranslatedText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('en'); // Default to English

  const translateText = () => {
    const apiKey = "YOUR_GOOGLE_API_KEY"; // Replace with your actual API key
    const text = "Hello, how are you?";

    fetch(`https://translation.googleapis.com/language/translate/v2?key=${apiKey}`, {
      method: "POST",
      body: JSON.stringify({ q: text, target: targetLanguage }),
      headers: { "Content-Type": "application/json" },
    })
      .then(response => response.json())
      .then(data => {
        setTranslatedText(data.data.translations[0].translatedText);
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div className='font-pop pr-3'>
      <select
        value={targetLanguage}
        onChange={(e) => setTargetLanguage(e.target.value)}
        className='m-2 p-2 bg-white border border-gray-300 rounded-md'
      >
        <option value="en">English</option>
        <option value="hi">Hindi</option>
        <option value="mr">Marathi</option>
        <option value="ta">Tamil</option>
      </select>
      <button onClick={translateText} className='m-2 p-2  text-white'>
        Translate
      </button>
      <p>{translatedText}</p>
    </div>
  );
};

export default GoogleTranslate;
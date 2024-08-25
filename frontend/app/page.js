"use client";

import React, { useState } from 'react';

export default function Home() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleInputChange = (e) => setJsonInput(e.target.value);

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonInput);
      const res = await fetch('https://your-heroku-app-url/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(parsedData)
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error('Invalid JSON:', error);
      alert('Invalid JSON input');
    }
  };

  const handleOptionChange = (e) => {
    const { value, checked } = e.target;
    setSelectedOptions((prev) =>
      checked ? [...prev, value] : prev.filter((opt) => opt !== value)
    );
  };

  return (
    <div>
      <h1>BFHL API Frontend</h1>
      <textarea
        rows="4"
        cols="50"
        placeholder='Enter JSON data here'
        value={jsonInput}
        onChange={handleInputChange}
      />
      <button onClick={handleSubmit}>Submit</button>
      {response && (
        <div>
          <h2>Response</h2>
          <label>
            <input
              type="checkbox"
              value="numbers"
              onChange={handleOptionChange}
            />
            Numbers
          </label>
          <label>
            <input
              type="checkbox"
              value="alphabets"
              onChange={handleOptionChange}
            />
            Alphabets
          </label>
          <label>
            <input
              type="checkbox"
              value="highest_lowercase_alphabet"
              onChange={handleOptionChange}
            />
            Highest Lowercase Alphabet
          </label>
          <pre>
            {JSON.stringify(
              Object.fromEntries(
                Object.entries(response).filter(([key]) =>
                  selectedOptions.includes(key)
                )
              ),
              null,
              2
            )}
          </pre>
        </div>
      )}
    </div>
  );
}

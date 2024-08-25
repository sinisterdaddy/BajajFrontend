"use client";

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';

export default function Home() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const options = [
    { value: 'numbers', label: 'Numbers' },
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'highest_lowercase_alphabet', label: 'Highest Lowercase Alphabet' }
  ];

  const handleInputChange = (e) => setJsonInput(e.target.value);

  const handleSubmit = async () => {
    try {
      setErrorMessage('');
      const parsedData = JSON.parse(jsonInput); // Validate JSON
      const res = await fetch('https://bajajbackend-knll.onrender.com/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(parsedData)
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      setErrorMessage('Invalid JSON input. Please correct the format.');
    }
  };

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected ? selected.map(option => option.value) : []);
  };

  return (
    <div className="container">
      <h1 className="title">Bajaj Finserv Health Challenge</h1>
      <h2 className="subtitle">API Input</h2>
      <div className="mb-3">
        <textarea
          className="form-control textarea"
          rows="4"
          placeholder='Enter JSON data here'
          value={jsonInput}
          onChange={handleInputChange}
        />
      </div>
      <div className="text-center">
        <button onClick={handleSubmit} className="btn btn-primary mb-4">Submit</button>
      </div>
      {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}
      {response && (
        <div>
          <h2 className="subtitle">Multi Filter</h2>
          <div className="d-flex justify-content-center mb-4">
            <Select
              isMulti
              options={options}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={handleSelectChange}
            />
          </div>
          {selectedOptions.length > 0 && (
            <div className="filteredResponse">
              <h3>Filtered Response</h3>
              {selectedOptions.includes('numbers') && (
                <p>Numbers: {response.numbers.join(',')}</p>
              )}
              {selectedOptions.includes('alphabets') && (
                <p>Alphabets: {response.alphabets.join(',')}</p>
              )}
              {selectedOptions.includes('highest_lowercase_alphabet') && (
                <p>Highest Lowercase Alphabet: {response.highest_lowercase_alphabet.join(',')}</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

// Styles with visibility fixes
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  
  :root {
    color-scheme: light;
  }
  
  body {
    font-family: 'Inter', sans-serif;
    background-color: #f8fafc;
    margin: 0;
    padding: 0;
    color: #111827;
  }

  .card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  }

  input, select, textarea {
    color: #111827 !important;
    background-color: white !important;
  }

  input::placeholder, textarea::placeholder {
    color: #6B7280 !important;
  }

  input[type="radio"], input[type="checkbox"] {
    border-color: #D1D5DB !important;
  }

  table {
    background-color: white !important;
  }

  th {
    color: #374151 !important;
    background-color: #F9FAFB !important;
  }

  td {
    color: #111827 !important;
  }

  button {
    color: inherit !important;
  }

  a {
    color: inherit !important;
  }
`;

// Add styles to document
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

// Force light mode meta tag
const metaColorScheme = document.createElement("meta");
metaColorScheme.setAttribute("name", "color-scheme");
metaColorScheme.setAttribute("content", "light");
document.head.appendChild(metaColorScheme);

// Add Tailwind CSS
const tailwindScript = document.createElement("script");
tailwindScript.src = "https://cdn.tailwindcss.com";
document.head.appendChild(tailwindScript);

// Force light mode in Tailwind
const forceLightMode = document.createElement("script");
forceLightMode.innerHTML = `
  if (window.tailwind) {
    window.tailwind.config = {
      ...window.tailwind.config,
      darkMode: false
    }
  }
`;
document.head.appendChild(forceLightMode);

function App() {
  const [rows, setRows] = useState([{
    id: Date.now(),
    year: new Date().getFullYear(),
    income: '',
    fieldSize: '',
    crops: '',
    price: '',
    yield: '',
    reportedIncome: ''
  }]);

  const addRow = () => {
    setRows([...rows, {
      id: Date.now(),
      year: new Date().getFullYear(),
      income: '',
      fieldSize: '',
      crops: '',
      price: '',
      yield: '',
      reportedIncome: ''
    }]);
  };

  const deleteRow = (id) => {
    setRows(rows.filter(row => row.id !== id));
  };

  const handleInputChange = (id, field, value) => {
    setRows(rows.map(row => 
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', rows);
  };

  return (
    <div className="bg-gray-50">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 pt-4 flex flex-col">
          <div className="px-4 pb-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-green-700">AgriCred</h2>
            <p className="text-sm text-gray-600">Complete your profile</p>
          </div>

          <nav className="px-2 pt-3 flex-1">
            <a href="register1.html" className="flex items-center px-3 py-2 mb-1 rounded-md text-gray-600">
              <span className="bg-green-100 text-green-700 w-5 h-5 rounded-full flex items-center justify-center text-xs mr-2">✓</span>
              <span className="text-sm">Registration</span>
            </a>

            <a href="register2.html" className="flex items-center px-3 py-2 mb-1 rounded-md text-gray-600">
              <span className="bg-green-100 text-green-700 w-5 h-5 rounded-full flex items-center justify-center text-xs mr-2">✓</span>
              <span className="text-sm">Farmstead</span>
            </a>

            <a href="register3.html" className="flex items-center px-3 py-2 mb-1 rounded-md bg-green-700 text-white">
              <span className="bg-white text-green-700 w-5 h-5 rounded-full flex items-center justify-center text-xs mr-2">3</span>
              <span className="text-sm">General Information</span>
            </a>

            {['Proof', 'Education', 'Contact', 'Property', 'Final Step'].map((step, index) => (
              <a 
                key={index}
                href={`register${index + 4}.html`} 
                className="flex items-center px-3 py-2 mb-1 rounded-md text-gray-600"
              >
                <span className="bg-gray-100 w-5 h-5 rounded-full flex items-center justify-center text-xs mr-2">
                  {index + 4}
                </span>
                <span className="text-sm">{step}</span>
              </a>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">General Information</h1>
              <p className="text-gray-600 text-sm">Please provide your personal and business details</p>
            </div>

            {/* Form */}
            <div className="card p-6">
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Personal Information */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name of Applicant</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 bg-white"
                      placeholder="Enter full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                    <input 
                      type="number" 
                      id="age" 
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 bg-white"
                      placeholder="Enter age"
                    />
                  </div>
                </div>

                {/* Gender and Legal Constitution */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <div className="flex space-x-4">
                      {['Male', 'Female', 'Other'].map((gender) => (
                        <label key={gender} className="flex items-center">
                          <input type="radio" name="gender" className="text-green-600 focus:ring-green-500 h-4 w-4" />
                          <span className="ml-2 text-sm text-gray-700">{gender}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="constitution" className="block text-sm font-medium text-gray-700 mb-1">Legal Constitution</label>
                    <select id="constitution" className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 bg-white">
                      <option value="">Select constitution type</option>
                      {['FPC', 'FPO', 'SHG', 'MSME', 'Trust', 'Other'].map((type) => (
                        <option key={type} value={type.toLowerCase()}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <textarea 
                    id="address" 
                    rows="3" 
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 bg-white"
                    placeholder="Enter your complete address"
                  ></textarea>
                </div>

                {/* Caste */}
                <div>
                  <label htmlFor="caste" className="block text-sm font-medium text-gray-700 mb-1">Caste</label>
                  <select id="caste" className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 bg-white">
                    {['General', 'OBC', 'SC', 'ST'].map((caste) => (
                      <option key={caste} value={caste.toLowerCase()}>{caste}</option>
                    ))}
                  </select>
                </div>

                {/* PAN and GST */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="pan" className="block text-sm font-medium text-gray-700 mb-1">PAN Number</label>
                    <input 
                      type="text" 
                      id="pan" 
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 bg-white"
                      placeholder="Enter PAN number"
                    />
                  </div>

                  <div>
                    <label htmlFor="gst" className="block text-sm font-medium text-gray-700 mb-1">GST Number</label>
                    <input 
                      type="text" 
                      id="gst" 
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 bg-white"
                      placeholder="Enter GST number"
                    />
                  </div>
                </div>

                {/* Farming Experience Section */}
                <div className="card p-6 mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Farming Experience</h3>
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="totalExperience" className="block text-sm font-medium text-gray-700 mb-1">
                          Total Years of Farming Experience
                        </label>
                        <input 
                          type="number" 
                          id="totalExperience" 
                          name="totalExperience" 
                          min="0"
                          max="99"
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 bg-white"
                          placeholder="Enter years of experience"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="farmingType" className="block text-sm font-medium text-gray-700 mb-1">
                          Primary Type of Farming
                        </label>
                        <select 
                          id="farmingType" 
                          name="farmingType" 
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 bg-white"
                        >
                          <option value="">Select farming type</option>
                          {['Crop Farming', 'Dairy Farming', 'Poultry Farming', 'Mixed Farming', 'Organic Farming', 'Other'].map((type) => (
                            <option key={type} value={type.toLowerCase().replace(' ', '_')}>{type}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Crops & Activities */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Major Crops/Activities (Check all that apply)
                      </label>
                      <div className="grid grid-cols-3 gap-4">
                        {['Rice', 'Wheat', 'Pulses', 'Vegetables', 'Fruits', 'Dairy'].map((crop) => (
                          <div key={crop} className="flex items-center">
                            <input 
                              type="checkbox" 
                              id={crop.toLowerCase()} 
                              name="crops[]" 
                              value={crop.toLowerCase()} 
                              className="mr-2 text-green-600 focus:ring-green-500"
                            />
                            <label htmlFor={crop.toLowerCase()} className="text-gray-700">{crop}</label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Training */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Have you received any agricultural training?
                      </label>
                      <div className="flex space-x-4">
                        {['Yes', 'No'].map((option) => (
                          <div key={option} className="flex items-center">
                            <input 
                              type="radio" 
                              id={`training_${option.toLowerCase()}`} 
                              name="training" 
                              value={option.toLowerCase()} 
                              className="mr-2 text-green-600 focus:ring-green-500"
                            />
                            <label htmlFor={`training_${option.toLowerCase()}`} className="text-gray-700">{option}</label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Income Form Table */}
                    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-900">Past Records</h2>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="min-w-full">
                          <thead>
                            <tr className="bg-gray-50">
                              {[
                                'Year',
                                'Income (₹)',
                                'Field Size (ha)',
                                'Crops',
                                'Price (₹/ton)',
                                'Yield (ton/ha)',
                                'Reported Income (₹)',
                                'Action'
                              ].map((header) => (
                                <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  {header}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {rows.map((row) => (
                              <tr key={row.id} className="bg-white hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <input
                                    type="number"
                                    value={row.year}
                                    onChange={(e) => handleInputChange(row.id, 'year', e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 bg-white"
                                    min="1900"
                                    max="2100"
                                    required
                                  />
                                </td>
                                {/* Other table cells with similar input styling */}
                                {['income', 'fieldSize', 'crops', 'price', 'yield', 'reportedIncome'].map((field) => (
                                  <td key={field} className="px-6 py-4 whitespace-nowrap">
                                    <input
                                      type={field === 'crops' ? 'text' : 'number'}
                                      value={row[field]}
                                      onChange={(e) => handleInputChange(row.id, field, e.target.value)}
                                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 bg-white"
                                      required
                                    />
                                  </td>
                                ))}
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <button
                                    type="button"
                                    onClick={() => deleteRow(row.id)}
                                    className="text-red-600 hover:text-red-900"
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="flex justify-between mt-6">
                        <button
                          type="button"
                          onClick={addRow}
                          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        >
                          Add Row
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Submit All Records
                        </button>
                      </div>
                    </div>

                    {/* Additional Details */}
                    <div>
                      <label htmlFor="additionalDetails" className="block text-sm font-medium text-gray-700 mb-1">
                        Additional Details/Special Skills
                      </label>
                      <textarea 
                        id="additionalDetails" 
                        name="additionalDetails" 
                        rows="3" 
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 bg-white"
                        placeholder="Enter any additional farming experience or special skills"
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-4">
                  <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
                    Back
                  </button>
                  <button className="px-6 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">
                    <a href="register4.html">Continue</a>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Render the App
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);

export default App;

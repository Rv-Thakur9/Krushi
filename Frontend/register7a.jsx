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

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th, td {
    padding: 0.75rem;
    border: 1px solid #e5e7eb;
  }

  th {
    background-color: #f9fafb;
    font-weight: 500;
  }

  input, select {
    color: #111827 !important;
    background-color: white !important;
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

// Add Tailwind CSS
const tailwindScript = document.createElement("script");
tailwindScript.src = "https://cdn.tailwindcss.com";
document.head.appendChild(tailwindScript);

function App() {
  const currentDateTime = "2025-03-28 18:07:13";
  const currentUser = "Rv-Thakur9";

  // State for bank details
  const [bankDetails, setBankDetails] = useState({
    bankName: '',
    branchName: '',
    accountNumber: ''
  });

  // State for land holdings
  const [landHoldings, setLandHoldings] = useState([{
    id: Date.now(),
    village: '',
    surveyNo: '',
    holdingType: 'Freehold',
    area: '',
    irrigated: 'Yes',
    irrigationSource: 'Bore Well',
    charge: ''
  }]);

  // State for financial details
  const [financialDetails, setFinancialDetails] = useState({
    agriculturalIncome: '',
    otherIncome: '',
    monthlyExpenses: '',
    totalIncome: ''
  });

  // State for home ownership
  const [homeDetails, setHomeDetails] = useState({
    occupantsCount: '',
    dependentsCount: '',
    houseArea: '',
    sanitaryAvailability: ''
  });

  // Handler for adding new land holding row
  const addLandHoldingRow = () => {
    setLandHoldings([...landHoldings, {
      id: Date.now(),
      village: '',
      surveyNo: '',
      holdingType: 'Freehold',
      area: '',
      irrigated: 'Yes',
      irrigationSource: 'Bore Well',
      charge: ''
    }]);
  };

  // Handler for deleting land holding row
  const deleteLandHoldingRow = (id) => {
    if (landHoldings.length > 1) {
      setLandHoldings(landHoldings.filter(row => row.id !== id));
    } else {
      // Reset the row instead of deleting if it's the last one
      setLandHoldings([{
        id: Date.now(),
        village: '',
        surveyNo: '',
        holdingType: 'Freehold',
        area: '',
        irrigated: 'Yes',
        irrigationSource: 'Bore Well',
        charge: ''
      }]);
    }
  };

  // Handler for updating land holding row
  const updateLandHolding = (id, field, value) => {
    setLandHoldings(landHoldings.map(row => 
      row.id === id ? { ...row, [field]: value } : row
    ));
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
            {[
              { name: 'Registration', status: 'completed' },
              { name: 'Farmstead', status: 'completed' },
              { name: 'General Information', status: 'completed' },
              { name: 'Proof', status: 'completed' },
              { name: 'Education', status: 'completed' },
              { name: 'Contact', status: 'completed' },
              { name: 'Property', status: 'current' },
              { name: 'Final Step', status: 'pending' }
            ].map((item, index) => (
              <a
                key={index}
                href={`register${index + 1}.html`}
                className={`flex items-center px-3 py-2 mb-1 rounded-md ${
                  item.status === 'current' 
                    ? 'bg-green-700 text-white'
                    : 'text-gray-600'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs mr-2 ${
                  item.status === 'completed'
                    ? 'bg-green-100 text-green-700'
                    : item.status === 'current'
                    ? 'bg-white text-green-700'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {item.status === 'completed' ? '✓' : index + 1}
                </span>
                <span className="text-sm">{item.name}</span>
              </a>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Property & Financial Details</h1>
              <p className="text-gray-600 text-sm">Enter your property and financial information</p>
            </div>

            <form className="space-y-6">
              {/* Bank Account Details */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Bank Account Details</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th>Name of Bank</th>
                        <th>Name of Branch</th>
                        <th>Account Number</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <input 
                            type="text" 
                            className="w-full border-0 p-2"
                            value={bankDetails.bankName}
                            onChange={(e) => setBankDetails({...bankDetails, bankName: e.target.value})}
                            placeholder="Enter bank name"
                          />
                        </td>
                        <td>
                          <input 
                            type="text" 
                            className="w-full border-0 p-2"
                            value={bankDetails.branchName}
                            onChange={(e) => setBankDetails({...bankDetails, branchName: e.target.value})}
                            placeholder="Enter branch name"
                          />
                        </td>
                        <td>
                          <input 
                            type="text" 
                            className="w-full border-0 p-2"
                            value={bankDetails.accountNumber}
                            onChange={(e) => setBankDetails({...bankDetails, accountNumber: e.target.value})}
                            placeholder="Enter account number"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Land Holdings */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Land Holdings</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th>Village</th>
                        <th>Survey/Block No.</th>
                        <th>Type of Holding</th>
                        <th>Area (Hectare)</th>
                        <th>Irrigated Land</th>
                        <th>Source of Irrigation</th>
                        <th>Charge on Land</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {landHoldings.map((row) => (
                        <tr key={row.id}>
                          <td>
                            <input 
                              type="text" 
                              className="w-full border-0 p-2"
                              value={row.village}
                              onChange={(e) => updateLandHolding(row.id, 'village', e.target.value)}
                            />
                          </td>
                          <td>
                            <input 
                              type="text" 
                              className="w-full border-0 p-2"
                              value={row.surveyNo}
                              onChange={(e) => updateLandHolding(row.id, 'surveyNo', e.target.value)}
                            />
                          </td>
                          <td>
                            <select 
                              className="w-full border-0 p-2"
                              value={row.holdingType}
                              onChange={(e) => updateLandHolding(row.id, 'holdingType', e.target.value)}
                            >
                              {['Freehold', 'Leasehold', 'Joint Ownership'].map(type => (
                                <option key={type} value={type}>{type}</option>
                              ))}
                            </select>
                          </td>
                          <td>
                            <input 
                              type="number" 
                              className="w-full border-0 p-2"
                              value={row.area}
                              onChange={(e) => updateLandHolding(row.id, 'area', e.target.value)}
                            />
                          </td>
                          <td>
                            <select 
                              className="w-full border-0 p-2"
                              value={row.irrigated}
                              onChange={(e) => updateLandHolding(row.id, 'irrigated', e.target.value)}
                            >
                              <option>Yes</option>
                              <option>No</option>
                            </select>
                          </td>
                          <td>
                            <select 
                              className="w-full border-0 p-2"
                              value={row.irrigationSource}
                              onChange={(e) => updateLandHolding(row.id, 'irrigationSource', e.target.value)}
                            >
                              <option>Bore Well</option>
                              <option>No</option>
                            </select>
                          </td>
                          <td>
                            <input 
                              type="text" 
                              className="w-full border-0 p-2"
                              value={row.charge}
                              onChange={(e) => updateLandHolding(row.id, 'charge', e.target.value)}
                            />
                          </td>
                          <td>
                            <button
                              type="button"
                              onClick={() => deleteLandHoldingRow(row.id)}
                              className="inline-flex items-center p-2 border border-transparent rounded-md text-red-600 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={addLandHoldingRow}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                    </svg>
                    Add Row
                  </button>
                </div>
              </div>

              {/* Annual Income */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Present Annual Income</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Agricultural Income (Rs.)</label>
                    <input 
                      type="number" 
                      className="w-full px-3 py-2 rounded-lg border border-gray-300"
                      value={financialDetails.agriculturalIncome}
                      onChange={(e) => setFinancialDetails({...financialDetails, agriculturalIncome: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Other Income (Rs.)</label>
                    <input 
                      type="number" 
                      className="w-full px-3 py-2 rounded-lg border border-gray-300"
                      value={financialDetails.otherIncome}
                      onChange={(e) => setFinancialDetails({...financialDetails, otherIncome: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Expenses</label>
                    <input 
                      type="number" 
                      className="w-full px-3 py-2 rounded-lg border border-gray-300"
                      value={financialDetails.monthlyExpenses}
                      onChange={(e) => setFinancialDetails({...financialDetails, monthlyExpenses: e.target.value})}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Income (Rs.)</label>
                    <input 
                      type="number" 
                      className="w-full px-3 py-2 rounded-lg border border-gray-300"
                      value={financialDetails.totalIncome}
                      onChange={(e) => setFinancialDetails({...financialDetails, totalIncome: e.target.value})}
                      readOnly
                    />
                  </div>
                </div>
              </div>

              {/* Home Ownership */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Home Ownership</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Occupants Count</label>
                    <input 
                      type="number" 
                      className="w-full px-3 py-2 rounded-lg border border-gray-300"
                      value={homeDetails.occupantsCount}
                      onChange={(e) => setHomeDetails({...homeDetails, occupantsCount: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Number of Dependents</label>
                    <input 
                      type="number" 
                      className="w-full px-3 py-2 rounded-lg border border-gray-300"
                      value={homeDetails.dependentsCount}
                      onChange={(e) => setHomeDetails({...homeDetails, dependentsCount: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">House Area</label>
                    <input 
                      type="number" 
                      className="w-full px-3 py-2 rounded-lg border border-gray-300"
                      value={homeDetails.houseArea}
                      onChange={(e) => setHomeDetails({...homeDetails, houseArea: e.target.value})}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sanitary/Water Availability</label>
                    <input 
                      type="number" 
                      className="w-full px-3 py-2 rounded-lg border border-gray-300"
                      value={homeDetails.sanitaryAvailability}
                      onChange={(e) => setHomeDetails({...homeDetails, sanitaryAvailability: e.target.value})}
                      readOnly
                    />
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <button type="button" className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
                  <a href="register6.html">Back</a>
                </button>
                <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">
                  <a href="register7a.html">Continue</a>
                </button>
              </div>
            </form>
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

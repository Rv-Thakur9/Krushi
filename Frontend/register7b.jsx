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
  const currentDateTime = "2025-03-28 18:08:56";
  const currentUser = "Rv-Thakur9";

  // State for borrowings table
  const [borrowings, setBorrowings] = useState([{
    id: Date.now(),
    year: '',
    institution: '',
    accountNumber: '',
    purpose: '',
    outstandingAmount: '',
    installmentDue: '',
    overdueAmount: '',
    securities: ''
  }]);

  // State for guarantor details
  const [guarantorDetails, setGuarantorDetails] = useState({
    bank: '',
    guaranteeAmount: '',
    outstanding: '',
    status: 'Regular'
  });

  // State for agricultural assets
  const [assets, setAssets] = useState({
    ploughingAnimals: {
      count: 0,
      age: 0,
      health: 'good',
      value: 0
    },
    milchAnimals: {
      count: 0,
      age: 0,
      monthlyIncome: 0,
      value: 0
    },
    farmBirds: {
      count: 0,
      type: 'poultry',
      monthlyIncome: 0,
      value: 0
    },
    pumpSets: {
      count: 0,
      age: 0,
      condition: 'good',
      value: 0
    },
    tractor: {
      year: 2025,
      mileage: 0,
      condition: 'good',
      value: 0
    },
    transport: {
      year: 2025,
      mileage: 0,
      condition: 'good',
      value: 0
    }
  });

  // Handler for adding new borrowing row
  const addBorrowingRow = () => {
    setBorrowings([...borrowings, {
      id: Date.now(),
      year: '',
      institution: '',
      accountNumber: '',
      purpose: '',
      outstandingAmount: '',
      installmentDue: '',
      overdueAmount: '',
      securities: ''
    }]);
  };

  // Handler for deleting borrowing row
  const deleteBorrowingRow = (id) => {
    if (borrowings.length > 1) {
      setBorrowings(borrowings.filter(row => row.id !== id));
    }
  };

  // Handler for updating borrowing row
  const updateBorrowing = (id, field, value) => {
    setBorrowings(borrowings.map(row => 
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  // Handler for updating assets
  const updateAsset = (category, field, value) => {
    setAssets(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  // Calculate total assets value
  const calculateTotalAssets = () => {
    return Object.values(assets).reduce((total, asset) => total + Number(asset.value), 0);
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

            {/* Borrowings Section */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Details of Past Borrowings</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th>Year</th>
                      <th>Lending Institution</th>
                      <th>Loan Account Number</th>
                      <th>Purpose</th>
                      <th>Outstanding Amount</th>
                      <th>Installment Due</th>
                      <th>Overdue Amount</th>
                      <th>Securities Offered</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {borrowings.map(row => (
                      <tr key={row.id}>
                        <td>
                          <input 
                            type="text"
                            className="w-full border-0 p-2"
                            value={row.year}
                            onChange={(e) => updateBorrowing(row.id, 'year', e.target.value)}
                          />
                        </td>
                        <td>
                          <input 
                            type="text"
                            className="w-full border-0 p-2"
                            value={row.institution}
                            onChange={(e) => updateBorrowing(row.id, 'institution', e.target.value)}
                          />
                        </td>
                        <td>
                          <input 
                            type="text"
                            className="w-full border-0 p-2"
                            value={row.accountNumber}
                            onChange={(e) => updateBorrowing(row.id, 'accountNumber', e.target.value)}
                          />
                        </td>
                        <td>
                          <input 
                            type="text"
                            className="w-full border-0 p-2"
                            value={row.purpose}
                            onChange={(e) => updateBorrowing(row.id, 'purpose', e.target.value)}
                          />
                        </td>
                        <td>
                          <input 
                            type="number"
                            className="w-full border-0 p-2"
                            value={row.outstandingAmount}
                            onChange={(e) => updateBorrowing(row.id, 'outstandingAmount', e.target.value)}
                          />
                        </td>
                        <td>
                          <input 
                            type="number"
                            className="w-full border-0 p-2"
                            value={row.installmentDue}
                            onChange={(e) => updateBorrowing(row.id, 'installmentDue', e.target.value)}
                          />
                        </td>
                        <td>
                          <input 
                            type="number"
                            className="w-full border-0 p-2"
                            value={row.overdueAmount}
                            onChange={(e) => updateBorrowing(row.id, 'overdueAmount', e.target.value)}
                          />
                        </td>
                        <td>
                          <input 
                            type="text"
                            className="w-full border-0 p-2"
                            value={row.securities}
                            onChange={(e) => updateBorrowing(row.id, 'securities', e.target.value)}
                          />
                        </td>
                        <td>
                          <button
                            type="button"
                            onClick={() => deleteBorrowingRow(row.id)}
                            className="text-red-500 hover:text-red-700 px-2"
                          >
                            ×
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
                  onClick={addBorrowingRow}
                  className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                  </svg>
                  Add Row
                </button>
              </div>
            </div>

            {/* Guarantor Details */}
            <div className="card p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Liabilities as a Guarantor</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th>Bank/Institution</th>
                      <th>Amount of Guarantee</th>
                      <th>Present Outstanding</th>
                      <th>Account Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <input 
                          type="text"
                          className="w-full border-0 p-2"
                          value={guarantorDetails.bank}
                          onChange={(e) => setGuarantorDetails({...guarantorDetails, bank: e.target.value})}
                        />
                      </td>
                      <td>
                        <input 
                          type="number"
                          className="w-full border-0 p-2"
                          value={guarantorDetails.guaranteeAmount}
                          onChange={(e) => setGuarantorDetails({...guarantorDetails, guaranteeAmount: e.target.value})}
                        />
                      </td>
                      <td>
                        <input 
                          type="number"
                          className="w-full border-0 p-2"
                          value={guarantorDetails.outstanding}
                          onChange={(e) => setGuarantorDetails({...guarantorDetails, outstanding: e.target.value})}
                        />
                      </td>
                      <td>
                        <select 
                          className="w-full border-0 p-2"
                          value={guarantorDetails.status}
                          onChange={(e) => setGuarantorDetails({...guarantorDetails, status: e.target.value})}
                        >
                          <option value="Regular">Regular</option>
                          <option value="Overdue">Overdue</option>
                        </select>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Agricultural Assets */}
            <div className="card p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Agricultural Assets</h3>
              
              {/* Ploughing Animals */}
              <div className="mb-6">
                <h5 className="font-medium text-gray-800 mb-2">Ploughing Animals</h5>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-4 gap-4">
                    {[
                      { label: 'Number of Animals', field: 'count', type: 'number' },
                      { label: 'Average Age (Years)', field: 'age', type: 'number' },
                      { 
                        label: 'Health Condition', 
                        field: 'health', 
                        type: 'select',
                        options: ['Excellent', 'Good', 'Fair', 'Poor']
                      },
                      { label: 'Total Value (Rs.)', field: 'value', type: 'number' }
                    ].map(item => (
                      <div key={item.field}>
                        <label className="text-sm text-gray-600">{item.label}</label>
                        {item.type === 'select' ? (
                          <select
                            className="w-full border rounded p-2"
                            value={assets.ploughingAnimals[item.field]}
                            onChange={(e) => updateAsset('ploughingAnimals', item.field, e.target.value)}
                          >
                            {item.options.map(option => (
                              <option key={option.toLowerCase()} value={option.toLowerCase()}>
                                {option}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type={item.type}
                            className="w-full border rounded p-2"
                            value={assets.ploughingAnimals[item.field]}
                            onChange={(e) => updateAsset('ploughingAnimals', item.field, e.target.value)}
                            min="0"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Milch Animals */}
<div className="mb-6">
  <h5 className="font-medium text-gray-800 mb-2">Milch Animals</h5>
  <div className="bg-gray-50 p-4 rounded-lg">
    <div className="grid grid-cols-4 gap-4">
      {[
        { label: 'Number of Animals', field: 'count', type: 'number' },
        { label: 'Average Age (Years)', field: 'age', type: 'number' },
        { label: 'Monthly Income (Rs.)', field: 'monthlyIncome', type: 'number' },
        { label: 'Total Value (Rs.)', field: 'value', type: 'number' }
      ].map(item => (
        <div key={item.field}>
          <label className="text-sm text-gray-600">{item.label}</label>
          <input
            type={item.type}
            className="w-full border rounded p-2"
            value={assets.milchAnimals[item.field]}
            onChange={(e) => updateAsset('milchAnimals', item.field, e.target.value)}
            min="0"
          />
        </div>
      ))}
    </div>
  </div>
</div>

{/* Farm Birds */}
<div className="mb-6">
  <h5 className="font-medium text-gray-800 mb-2">Farm Birds</h5>
  <div className="bg-gray-50 p-4 rounded-lg">
    <div className="grid grid-cols-4 gap-4">
      {[
        { label: 'Number of Birds', field: 'count', type: 'number' },
        { 
          label: 'Type of Birds', 
          field: 'type', 
          type: 'select',
          options: ['Poultry', 'Duck', 'Other']
        },
        { label: 'Monthly Income (Rs.)', field: 'monthlyIncome', type: 'number' },
        { label: 'Total Value (Rs.)', field: 'value', type: 'number' }
      ].map(item => (
        <div key={item.field}>
          <label className="text-sm text-gray-600">{item.label}</label>
          {item.type === 'select' ? (
            <select
              className="w-full border rounded p-2"
              value={assets.farmBirds[item.field]}
              onChange={(e) => updateAsset('farmBirds', item.field, e.target.value)}
            >
              {item.options.map(option => (
                <option key={option.toLowerCase()} value={option.toLowerCase()}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={item.type}
              className="w-full border rounded p-2"
              value={assets.farmBirds[item.field]}
              onChange={(e) => updateAsset('farmBirds', item.field, e.target.value)}
              min="0"
            />
          )}
        </div>
      ))}
    </div>
  </div>
</div>

{/* Pump Sets */}
<div className="mb-6">
  <h5 className="font-medium text-gray-800 mb-2">Pump Sets</h5>
  <div className="bg-gray-50 p-4 rounded-lg">
    <div className="grid grid-cols-4 gap-4">
      {[
        { label: 'Number of Sets', field: 'count', type: 'number' },
        { label: 'Age (Years)', field: 'age', type: 'number' },
        { 
          label: 'Condition', 
          field: 'condition', 
          type: 'select',
          options: ['Excellent', 'Good', 'Fair', 'Poor']
        },
        { label: 'Total Value (Rs.)', field: 'value', type: 'number' }
      ].map(item => (
        <div key={item.field}>
          <label className="text-sm text-gray-600">{item.label}</label>
          {item.type === 'select' ? (
            <select
              className="w-full border rounded p-2"
              value={assets.pumpSets[item.field]}
              onChange={(e) => updateAsset('pumpSets', item.field, e.target.value)}
            >
              {item.options.map(option => (
                <option key={option.toLowerCase()} value={option.toLowerCase()}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={item.type}
              className="w-full border rounded p-2"
              value={assets.pumpSets[item.field]}
              onChange={(e) => updateAsset('pumpSets', item.field, e.target.value)}
              min="0"
            />
          )}
        </div>
      ))}
    </div>
  </div>
</div>

{/* Tractor */}
<div className="mb-6">
  <h5 className="font-medium text-gray-800 mb-2">Tractor</h5>
  <div className="bg-gray-50 p-4 rounded-lg">
    <div className="grid grid-cols-4 gap-4">
      {[
        { label: 'Manufacturing Year', field: 'year', type: 'number' },
        { label: 'Mileage (Hours)', field: 'mileage', type: 'number' },
        { 
          label: 'Condition', 
          field: 'condition', 
          type: 'select',
          options: ['Excellent', 'Good', 'Fair', 'Poor']
        },
        { label: 'Total Value (Rs.)', field: 'value', type: 'number' }
      ].map(item => (
        <div key={item.field}>
          <label className="text-sm text-gray-600">{item.label}</label>
          {item.type === 'select' ? (
            <select
              className="w-full border rounded p-2"
              value={assets.tractor[item.field]}
              onChange={(e) => updateAsset('tractor', item.field, e.target.value)}
            >
              {item.options.map(option => (
                <option key={option.toLowerCase()} value={option.toLowerCase()}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={item.type}
              className="w-full border rounded p-2"
              value={assets.tractor[item.field]}
              onChange={(e) => updateAsset('tractor', item.field, e.target.value)}
              min={item.field === 'year' ? "1960" : "0"}
              max={item.field === 'year' ? "2025" : undefined}
            />
          )}
        </div>
      ))}
    </div>
  </div>
</div>

{/* Transport Vehicle */}
<div className="mb-6">
  <h5 className="font-medium text-gray-800 mb-2">Transport Vehicle</h5>
  <div className="bg-gray-50 p-4 rounded-lg">
    <div className="grid grid-cols-4 gap-4">
      {[
        { label: 'Manufacturing Year', field: 'year', type: 'number' },
        { label: 'Mileage (KM)', field: 'mileage', type: 'number' },
        { 
          label: 'Condition', 
          field: 'condition', 
          type: 'select',
          options: ['Excellent', 'Good', 'Fair', 'Poor']
        },
        { label: 'Total Value (Rs.)', field: 'value', type: 'number' }
      ].map(item => (
        <div key={item.field}>
          <label className="text-sm text-gray-600">{item.label}</label>
          {item.type === 'select' ? (
            <select
              className="w-full border rounded p-2"
              value={assets.transport[item.field]}
              onChange={(e) => updateAsset('transport', item.field, e.target.value)}
            >
              {item.options.map(option => (
                <option key={option.toLowerCase()} value={option.toLowerCase()}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={item.type}
              className="w-full border rounded p-2"
              value={assets.transport[item.field]}
              onChange={(e) => updateAsset('transport', item.field, e.target.value)}
              min={item.field === 'year' ? "1960" : "0"}
              max={item.field === 'year' ? "2025" : undefined}
            />
          )}
        </div>
      ))}
    </div>
  </div>
</div>

              {/* Similar sections for other assets... */}
              
              {/* Total Assets Value */}
              <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">Total Assets Value:</span>
                  <span className="text-xl font-bold text-green-600">
                    ₹ {calculateTotalAssets().toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <button type="button" className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
                  <a href="register7.html">Back</a>
                </button>
                <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">
                  <a href="register8.html">Continue</a>
                </button>
              </div>
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

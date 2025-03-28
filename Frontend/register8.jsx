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

  .compact-radio {
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
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
  // Current date/time and user info
  const currentDateTime = "2025-03-28 18:10:52";
  const currentUser = "Rv-Thakur9";

  // State for loan details
  const [loanDetails, setLoanDetails] = useState({
    amount: '₹15,000',
    duration: '9 months',
    interest: '8%',
    purpose: 'Crop farming',
    type: 'Harvesting'
  });

  // State for repayment options
  const [repaymentOptions, setRepaymentOptions] = useState({
    type: 'differential',
    gracePeriod: '',
    paymentFrequency: '',
    cropBail: false
  });

  // Handler for type change
  const handleTypeChange = (e) => {
    setLoanDetails({
      ...loanDetails,
      type: e.target.value
    });
  };

  // Handler for repayment options
  const handleRepaymentChange = (field, value) => {
    setRepaymentOptions({
      ...repaymentOptions,
      [field]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted at:', currentDateTime);
    console.log('By user:', currentUser);
    console.log('Loan Details:', loanDetails);
    console.log('Repayment Options:', repaymentOptions);
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
              { name: 'Property', status: 'completed' },
              { name: 'Final Step', status: 'current' }
            ].map((item, index) => (
              <a
                key={index}
                href={`register${index + 1}.html`}
                className={`flex items-center px-3 py-1.5 mb-1 rounded-md ${
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
        <div className="flex-1 p-6">
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Credit Information Overview</h1>
            <p className="text-gray-600 text-sm">Review and confirm your loan details</p>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Loan Details */}
              <div className="card p-4">
                <h3 className="text-md font-semibold text-gray-900 mb-3">Loan Details</h3>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Amount', value: loanDetails.amount },
                    { label: 'Duration', value: loanDetails.duration },
                    { label: 'Interest', value: loanDetails.interest }
                  ].map((item, index) => (
                    <div key={index}>
                      <label className="block text-xs font-medium text-gray-700 mb-1">{item.label}</label>
                      <input 
                        type="text" 
                        className="w-full px-2 py-1.5 text-sm rounded-lg border border-gray-300 text-gray-900 bg-white"
                        value={item.value}
                        readOnly
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Loan Purpose */}
              <div className="card p-4">
                <h3 className="text-md font-semibold text-gray-900 mb-3">Purpose & Characteristics</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Purpose</label>
                    <input 
                      type="text" 
                      className="w-full px-2 py-1.5 text-sm rounded-lg border border-gray-300 text-gray-900 bg-white"
                      value={loanDetails.purpose}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Type</label>
                    <select 
                      className="w-full px-2 py-1.5 text-sm rounded-lg border border-gray-300 text-gray-900 bg-white"
                      value={loanDetails.type}
                      onChange={handleTypeChange}
                    >
                      <option>Harvesting</option>
                      <option>Sowing</option>
                      <option>Equipment Purchase</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="card p-4">
              <h3 className="text-md font-semibold text-gray-900 mb-3">Loan Repayment</h3>
              <div className="grid grid-cols-3 gap-4">
                {/* Type */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Type</label>
                  <div className="space-y-1">
                    {['differential', 'equal'].map((type) => (
                      <label key={type} className="flex items-center compact-radio">
                        <input 
                          type="radio"
                          name="repayment-type"
                          className="form-radio text-green-600"
                          checked={repaymentOptions.type === type}
                          onChange={() => handleRepaymentChange('type', type)}
                        />
                        <span className="ml-2 text-sm">
                          {type === 'differential' ? 'Differential rate' : 'Equal shares'}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Grace Period */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Grace Period</label>
                  <div className="space-y-1">
                    {[
                      { value: '3', label: '3 months (+0.5%)' },
                      { value: '6', label: '6 months (+0.7%)' },
                      { value: '8', label: '8 months (+1%)' }
                    ].map((period) => (
                      <label key={period.value} className="flex items-center compact-radio">
                        <input 
                          type="radio"
                          name="grace-period"
                          className="form-radio text-green-600"
                          checked={repaymentOptions.gracePeriod === period.value}
                          onChange={() => handleRepaymentChange('gracePeriod', period.value)}
                        />
                        <span className="ml-2 text-sm">{period.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Payment Frequency */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Payments</label>
                  <div className="space-y-1">
                    {[
                      'Weekly',
                      'Monthly',
                      'Quarterly',
                      'Two stages'
                    ].map((frequency) => (
                      <label key={frequency} className="flex items-center compact-radio">
                        <input 
                          type="radio"
                          name="payment-frequency"
                          className="form-radio text-green-600"
                          checked={repaymentOptions.paymentFrequency === frequency.toLowerCase()}
                          onChange={() => handleRepaymentChange('paymentFrequency', frequency.toLowerCase())}
                        />
                        <span className="ml-2 text-sm">{frequency}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Crop Bail Option */}
              <div className="mt-3">
                <label className="flex items-center">
                  <input 
                    type="checkbox"
                    className="form-checkbox text-green-600"
                    checked={repaymentOptions.cropBail}
                    onChange={(e) => handleRepaymentChange('cropBail', e.target.checked)}
                  />
                  <span className="ml-2 text-sm">Ready to leave the crop on bail</span>
                </label>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="col-span-2 flex justify-between mt-4">
              <button type="button" className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
                <a href="register7.html">Back</a>
              </button>
              <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">
                Submit Application
              </button>
            </div>
          </form>
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

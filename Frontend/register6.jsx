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

  button {
    color: inherit !important;
  }

  a {
    color: inherit !important;
  }

  * {
    color-scheme: light;
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

function App() {
  const currentDate = "2025-03-28 18:05:30";
  const currentUser = "Rv-Thakur9";

  const [formData, setFormData] = useState({
    mobileNumber: '',
    email: '',
    alternateMobile: '',
    alternateEmail: ''
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    console.log('Submission time:', currentDate);
    console.log('Submitted by:', currentUser);
    // Add your form submission logic here
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
              { name: 'Contact', status: 'current' },
              { name: 'Property', status: 'pending' },
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
        <div className="flex-1 overflow-auto bg-gray-50">
          <div className="p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Contact Information</h1>
              <p className="text-gray-600 text-sm">Please provide your contact details</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Primary Contact Information */}
              <div className="card p-6 bg-white">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Primary Contact Details</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                    <input 
                      type="tel" 
                      id="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 bg-white"
                      placeholder="Enter your mobile number"
                      pattern="[0-9]{10}"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 bg-white"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Alternate Contact Information */}
              <div className="card p-6 bg-white">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Alternate Contact Details</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Alternate Mobile Number</label>
                    <input 
                      type="tel" 
                      id="alternateMobile"
                      value={formData.alternateMobile}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 bg-white"
                      placeholder="Enter alternate mobile number"
                      pattern="[0-9]{10}"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Alternate Email Address</label>
                    <input 
                      type="email" 
                      id="alternateEmail"
                      value={formData.alternateEmail}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 bg-white"
                      placeholder="Enter alternate email address"
                    />
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <button type="button" className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
                  <a href="register5.html">Back</a>
                </button>
                <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">
                  <a href="register7.html">Continue</a>
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

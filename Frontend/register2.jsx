import React from 'react';
import { createRoot } from 'react-dom/client';

// Updated styles with visibility fixes
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

  .button-hover:hover {
    transform: translateY(-1px);
    transition: all 0.2s;
  }

  button {
    color: inherit !important;
  }

  a {
    color: inherit !important;
  }

  /* Force light mode */
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
  return (
    <div className="bg-gray-50 text-gray-900">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 pt-4 flex flex-col">
          <div className="px-4 pb-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-green-700">AgriCred</h2>
            <p className="text-sm text-gray-600">Complete your profile</p>
          </div>

          <nav className="px-2 pt-3 flex-1">
            <a href="register1.html" className="flex items-center px-3 py-2 mb-1 rounded-md bg-green-50 text-green-700">
              <span className="bg-green-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs mr-2">1</span>
              <span className="text-sm">Registration</span>
              <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
              </svg>
            </a>

            <a href="register2.html" className="flex items-center px-3 py-2 mb-1 rounded-md bg-green-700 text-white">
              <span className="bg-white text-green-700 w-5 h-5 rounded-full flex items-center justify-center text-xs mr-2">2</span>
              <span className="text-sm">Farmstead</span>
            </a>

            {['General Information', 'Proof', 'Education', 'Contact', 'Property', 'Final Step'].map((item, index) => (
              <a 
                key={index}
                href={`register${index + 3}.html`} 
                className="flex items-center px-3 py-2 mb-1 rounded-md text-gray-600 hover:bg-gray-50"
              >
                <span className="bg-gray-100 w-5 h-5 rounded-full flex items-center justify-center text-xs mr-2">
                  {index + 3}
                </span>
                <span className="text-sm">{item}</span>
              </a>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto bg-gray-50">
          <div className="p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Farm Details</h1>
              <p className="text-gray-600 text-sm">Provide information about your field and operations</p>
            </div>

            {/* Field Section */}
            <div className="card p-6 mb-4 bg-white">
              <h3 className="text-base font-semibold text-gray-900 mb-4">Field Information</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Field Size</div>
                  <div className="text-lg font-semibold text-gray-900">22.4 Ha</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Current Crop Type</div>
                  <div className="text-lg font-semibold text-gray-900">Grain Crops</div>
                </div>
              </div>
              <div className="flex space-x-3">
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">
                  Select on Map
                </button>
                <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-green-600">
                  Enter Manually
                </button>
              </div>
            </div>

            {/* Previous Crop Section */}
            <div className="card p-6 mb-4 bg-white">
              <h3 className="text-base font-semibold text-gray-900 mb-4">Previous Season's Crop</h3>
              <div className="grid grid-cols-4 gap-3">
                {['Grain Legumes', 'Grain Crops', 'Sunflower', 'Berries'].map((crop, index) => (
                  <button
                    key={index}
                    className={`px-3 py-2 border rounded-lg text-sm font-medium ${
                      crop === 'Grain Crops'
                        ? 'border-green-600 bg-green-50 text-green-600'
                        : 'text-gray-700 hover:border-green-600 hover:text-green-600'
                    }`}
                  >
                    {crop}
                  </button>
                ))}
              </div>
            </div>

            {/* Employees Section */}
            <div className="card p-6 mb-6 bg-white">
              <h3 className="text-base font-semibold text-gray-900 mb-2">Farm Workforce</h3>
              <p className="text-gray-600 text-sm mb-4">Select the number of permanent employees</p>
              <div className="grid grid-cols-4 gap-3">
                {['Up to 5', '5 - 10', '10 - 25', 'Over 25'].map((range, index) => (
                  <button
                    key={index}
                    className={`px-3 py-2 border rounded-lg text-sm font-medium ${
                      range === 'Up to 5'
                        ? 'border-green-600 bg-green-50 text-green-600'
                        : 'text-gray-700 hover:border-green-600 hover:text-green-600'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
                <a href="register3.html" className="text-gray-700">Next</a>
              </button>
              <button className="px-6 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">
                Save Progress
              </button>
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

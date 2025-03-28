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

  .upload-area {
    border: 2px dashed #e5e7eb;
    transition: all 0.3s ease;
  }

  .upload-area:hover {
    border-color: #16a34a;
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

function App() {
  const [selectedDocument, setSelectedDocument] = useState('aadhaar');

  const documents = [
    { id: 'aadhaar', title: 'Aadhaar Card', description: 'Unique ID issued by UIDAI' },
    { id: 'electricity', title: 'Electricity Bill', description: 'Not older than 3 months' },
    { id: 'pan', title: 'Pan Card', description: 'Issued by the Income Tax Department of India' }
  ];

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
              { name: 'Proof', status: 'current' },
              { name: 'Education', status: 'pending' },
              { name: 'Contact', status: 'pending' },
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
              <h1 className="text-2xl font-bold text-gray-900">Proof of Address</h1>
              <p className="text-gray-600 text-sm">Upload documents to verify your address</p>
            </div>

            {/* Document Upload Section */}
            <div className="card p-6 bg-white">
              <form>
                {/* Document Type Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Document Type</label>
                  <div className="grid grid-cols-3 gap-3">
                    {documents.map(doc => (
                      <button
                        key={doc.id}
                        type="button"
                        className={`text-left px-4 py-3 border-2 rounded-lg ${
                          selectedDocument === doc.id
                            ? 'border-green-600 bg-green-50'
                            : 'border-gray-200 hover:border-green-600'
                        }`}
                        onClick={() => setSelectedDocument(doc.id)}
                      >
                        <div className={selectedDocument === doc.id ? 'text-green-600' : 'text-gray-700'}>
                          {doc.title}
                        </div>
                        <div className="text-xs text-gray-500">{doc.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Upload Area */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Document</label>
                  <div className="upload-area rounded-lg p-8 text-center">
                    <input type="file" id="document" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
                    <label htmlFor="document" className="cursor-pointer">
                      <div className="mb-3">
                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4-4m4-4h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div className="text-sm text-gray-600">
                        <span className="text-green-600 font-medium">Click to upload</span> or drag and drop
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        PDF, JPG, PNG up to 5MB
                      </div>
                    </label>
                  </div>
                </div>

                {/* Upload Requirements */}
                <div className="mb-6 bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Document Requirements:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {[
                      'File should be clear and readable',
                      'Address should match with provided details',
                      'Document should not be expired'
                    ].map((requirement, index) => (
                      <li key={index} className="flex items-center">
                        <svg className="h-4 w-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                        </svg>
                        {requirement}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-4">
                  <button type="button" className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
                    Back
                  </button>
                  <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">
                    <a href="register5.html">Continue</a>
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

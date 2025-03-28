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
  const [qualification, setQualification] = useState('higher');
  const [formData, setFormData] = useState({
    institution: '',
    startYear: '',
    endYear: '',
    scoreType: 'percentage',
    score: '',
    additional: ''
  });

  const qualifications = [
    { id: 'secondary', title: 'Secondary', description: '10th Standard' },
    { id: 'higher', title: 'Higher Secondary', description: '12th Standard' },
    { id: 'graduate', title: 'Graduate', description: 'Bachelors Degree' }
  ];

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const generateYears = (start, end) => {
    return Array.from({ length: end - start + 1 }, (_, i) => end - i);
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
              { name: 'Education', status: 'current' },
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
              <h1 className="text-2xl font-bold text-gray-900">Educational Background</h1>
              <p className="text-gray-600 text-sm">Please provide your educational qualifications</p>
            </div>

            {/* Education Form */}
            <div className="card p-6 bg-white">
              <form>
                {/* Educational Details */}
                <div className="space-y-6">
                  {/* Highest Qualification */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Highest Qualification</label>
                    <div className="grid grid-cols-3 gap-3">
                      {qualifications.map(qual => (
                        <button
                          key={qual.id}
                          type="button"
                          onClick={() => setQualification(qual.id)}
                          className={`text-left px-4 py-3 border-2 rounded-lg ${
                            qualification === qual.id
                              ? 'border-green-600 bg-green-50'
                              : 'border-gray-200 hover:border-green-600'
                          }`}
                        >
                          <div className={qualification === qual.id ? 'text-green-600' : 'text-gray-700'}>
                            {qual.title}
                          </div>
                          <div className="text-xs text-gray-500">{qual.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* School/Institution */}
                  <div>
                    <label htmlFor="institution" className="block text-sm font-medium text-gray-700 mb-1">
                      School/Institution Name
                    </label>
                    <input 
                      type="text" 
                      id="institution"
                      value={formData.institution}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 bg-white"
                      placeholder="Enter your school or institution name"
                    />
                  </div>

                  {/* Year Selection */}
                  <div className="grid grid-cols-2 gap-6">
                    {['start', 'end'].map(yearType => (
                      <div key={yearType}>
                        <label htmlFor={`${yearType}-year`} className="block text-sm font-medium text-gray-700 mb-1">
                          {yearType === 'start' ? 'Start Year' : 'Completion Year'}
                        </label>
                        <select
                          id={`${yearType}Year`}
                          value={formData[`${yearType}Year`]}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 bg-white"
                        >
                          <option value="">Select year</option>
                          {generateYears(2021, 2025).map(year => (
                            <option key={year} value={year}>{year}</option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>

                  {/* Score */}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="score-type" className="block text-sm font-medium text-gray-700 mb-1">
                        Score Type
                      </label>
                      <select
                        id="scoreType"
                        value={formData.scoreType}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 bg-white"
                      >
                        <option value="percentage">Percentage</option>
                        <option value="cgpa">CGPA</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="score" className="block text-sm font-medium text-gray-700 mb-1">
                        Score
                      </label>
                      <input 
                        type="number"
                        id="score"
                        value={formData.score}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 bg-white"
                        placeholder="Enter your score"
                      />
                    </div>
                  </div>

                  {/* Additional Qualifications */}
                  <div>
                    <label htmlFor="additional" className="block text-sm font-medium text-gray-700 mb-1">
                      Additional Qualifications (Optional)
                    </label>
                    <textarea 
                      id="additional"
                      value={formData.additional}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 bg-white"
                      placeholder="Enter any additional qualifications or certifications"
                    />
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6">
                  <button type="button" className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
                    Back
                  </button>
                  <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">
                    <a href="register6.html">Continue</a>
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

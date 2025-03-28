export default function App() {
  return (
    <>
      {/* Include styles directly in the component */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          
          body {
            font-family: 'Inter', sans-serif;
            background-color: #f8fafc;
            margin: 0;
            padding: 0;
          }

          .card {
            background: white;
            border-radius: 12px;
            box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
          }

          .sidebar {
            width: 16rem;
            background: white;
            border-right: 1px solid #e5e7eb;
            padding-top: 1rem;
            display: flex;
            flex-direction: column;
          }

          .sidebar-header {
            padding: 0 1rem 1rem 1rem;
            border-bottom: 1px solid #e5e7eb;
          }

          .sidebar-title {
            font-size: 1.125rem;
            font-weight: 600;
            color: #15803d;
          }

          .sidebar-subtitle {
            font-size: 0.875rem;
            color: #4b5563;
          }

          .nav-item {
            display: flex;
            align-items: center;
            padding: 0.5rem 0.75rem;
            margin-bottom: 0.25rem;
            border-radius: 0.375rem;
            color: #4b5563;
            text-decoration: none;
          }

          .nav-item.active {
            background-color: #15803d;
            color: white;
          }

          .nav-number {
            width: 1.25rem;
            height: 1.25rem;
            border-radius: 9999px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.75rem;
            margin-right: 0.5rem;
            background-color: #f3f4f6;
          }

          .active .nav-number {
            background-color: white;
            color: #15803d;
          }

          .main-content {
            flex: 1;
            padding: 1.5rem;
          }

          .page-title {
            font-size: 1.5rem;
            font-weight: 700;
            color: #111827;
            margin-bottom: 0.25rem;
          }

          .page-subtitle {
            font-size: 0.875rem;
            color: #4b5563;
            margin-bottom: 1.5rem;
          }

          .form-group {
            margin-bottom: 1rem;
          }

          .form-label {
            display: block;
            font-size: 0.875rem;
            font-weight: 500;
            color: #374151;
            margin-bottom: 0.25rem;
          }

          .form-input {
            width: 100%;
            padding: 0.5rem 0.75rem;
            border: 1px solid #d1d5db;
            border-radius: 0.5rem;
            outline: none;
            transition: all 0.15s ease;
          }

          .form-input:focus {
            border-color: #22c55e;
            box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
          }

          .form-hint {
            font-size: 0.75rem;
            color: #6b7280;
            margin-top: 0.25rem;
          }

          .button {
            background-color: #16a34a;
            color: white;
            padding: 0.5rem 1.5rem;
            border-radius: 0.5rem;
            font-weight: 500;
            border: none;
            cursor: pointer;
            transition: background-color 0.15s ease;
          }

          .button:hover {
            background-color: #15803d;
          }
        `}
      </style>

      <div style={{ display: 'flex', minHeight: '100vh' }}>
        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar-header">
            <h2 className="sidebar-title">AgriCred</h2>
            <p className="sidebar-subtitle">Complete your profile</p>
          </div>

          <nav style={{ padding: '0.5rem' }}>
            <a href="#" className="nav-item active">
              <span className="nav-number">1</span>
              <span>Registration</span>
            </a>

            {['Farmstead', 'General Information', 'Proof', 'Education', 'Contact', 'Property', 'Final Step'].map((item, index) => (
              <a key={index} href="#" className="nav-item">
                <span className="nav-number">{index + 2}</span>
                <span>{item}</span>
              </a>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <div>
            <h1 className="page-title">Registration</h1>
            <p className="page-subtitle">Enter your basic information to get started</p>
          </div>

          <div className="card" style={{ padding: '1.5rem' }}>
            <form style={{ maxWidth: '28rem' }} onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label htmlFor="fullName" className="form-label">
                  Full Name
                </label>
                <input 
                  type="text" 
                  id="fullName" 
                  className="form-input"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="aadhar" className="form-label">
                  Aadhar Card Number
                </label>
                <input 
                  type="text" 
                  id="aadhar" 
                  className="form-input"
                  placeholder="Enter your Aadhar Card Number"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input 
                  type="email" 
                  id="email" 
                  className="form-input"
                  placeholder="Enter your email address"
                  required
                />
                <p className="form-hint">We'll send a verification link to this email</p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button type="submit" className="button">
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

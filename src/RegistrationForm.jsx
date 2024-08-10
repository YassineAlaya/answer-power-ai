// Suggested code may be subject to a license. Learn more: ~LicenseLog:1476426299.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:545979116.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:2410980334.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:3913640076.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:1504699518.
import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


function RegistrationForm({ onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const auth = getAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      onRegister(); // Notify App component that registration was successful
    } catch (error) {
      setError(error.message);
    }
  }; 
  
return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      <div>
        <label htmlFor="email">Email:</label>
        <input 
          type="email" 
          id="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input 
          type="password" 
          id="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
}

export default RegistrationForm;

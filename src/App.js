import React, { useState } from 'react';



const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
      setError('All fields are mandatory');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBXLa4m2AbfwfjEEoi8ijV2wWJvFgJjeOU`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error.message);
      }

      console.log('User has successfully signed up');
      // You can navigate to another page or perform additional actions upon successful signup
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogin = () => {
    // Redirect or navigate to the login page
  };

  return (
    <div className="container">
      
      <div className="signup-container">
        <h2>Sign Up</h2>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button onClick={handleSignup}>Sign Up</button>
        <p>Already have an account? <button onClick={handleLogin}>Login</button></p>
      </div>
    </div>
  );
};

export default Signup;

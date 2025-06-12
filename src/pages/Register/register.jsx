import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../pages/Register/register.css';
import registerImage from '../../assets/images/person.png'; // تأكد من المسار الصحيح للصورة

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState(''); // لتخزين الدور
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (username && email && password && password === confirmPassword && role) {
      // هنا يمكنك إضافة منطق API أو تسجيل المستخدم
      console.log(`User Role: ${role}`);
      navigate('/home'); // إعادة التوجيه إلى الصفحة الرئيسية بعد التسجيل
    } else {
      alert('Please ensure all fields are filled, passwords match, and role is selected');
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleRegister} className="register-form">
        <img src={registerImage} alt="Register Illustration" className="register-image" />
        <h2>Create an Account</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {/* إضافة اختيار الدور */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="">Select Role</option>
          <option value="landlord">Landlord</option>
          <option value="tenant">Tenant</option>
          <option value="tenant">Admin</option>

        </select>

        <button type="submit">Create Account</button>

        <p className="switch-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;

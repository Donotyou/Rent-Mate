
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../pages/Login/login.css';
import loginImage from '../../assets/images/person.png'; // تأكد من أن المسار صحيح للصورة

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // بيانات الـ Admin الثابتة
  const adminEmail = 'admin@example.com';  // إيميل ثابت
  const adminPassword = 'admin123';        // كلمة مرور ثابتة

  const handleLogin = (e) => {
    e.preventDefault();

    // التحقق من بيانات الـ Admin
    if (email === adminEmail && password === adminPassword) {
      // إذا كانت البيانات صحيحة، نقوم بتخزين الـ Token في localStorage
      localStorage.setItem('userToken', 'adminToken123'); // تخزين Token في localStorage

      // إعادة التوجيه إلى صفحة الـ Dashboard
      navigate('/dashboard');
    } else {
      alert('البريد الإلكتروني أو كلمة المرور غير صحيحة');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <img src={loginImage} alt="Login Illustration" className="login-image" />
        <h2>Login</h2>

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

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LoginPage;

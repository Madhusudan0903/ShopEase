import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

function RegisterPage() {
  const { register } = useAuth();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = 'First name is required';
    if (!form.lastName.trim()) errs.lastName = 'Last name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    if (form.phone && !/^\d{10}$/.test(form.phone)) errs.phone = 'Enter a valid 10-digit phone number';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const { confirmPassword, ...data } = form;
      await register(data);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card" style={{ maxWidth: '520px' }}>
        <h1>Create Account</h1>
        <p className="auth-subtitle">Join ShopVista for the best shopping experience</p>

        <form onSubmit={handleSubmit}>
          <div className="auth-form-row">
            <div className="form-group">
              <label className="form-label">First Name *</label>
              <input
                type="text"
                name="firstName"
                className={`form-input${errors.firstName ? ' error' : ''}`}
                placeholder="John"
                value={form.firstName}
                onChange={handleChange}
              />
              {errors.firstName && <p className="form-error">{errors.firstName}</p>}
            </div>
            <div className="form-group">
              <label className="form-label">Last Name *</label>
              <input
                type="text"
                name="lastName"
                className={`form-input${errors.lastName ? ' error' : ''}`}
                placeholder="Doe"
                value={form.lastName}
                onChange={handleChange}
              />
              {errors.lastName && <p className="form-error">{errors.lastName}</p>}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email Address *</label>
            <input
              type="email"
              name="email"
              className={`form-input${errors.email ? ' error' : ''}`}
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <p className="form-error">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              name="phone"
              className={`form-input${errors.phone ? ' error' : ''}`}
              placeholder="9876543210"
              value={form.phone}
              onChange={handleChange}
            />
            {errors.phone && <p className="form-error">{errors.phone}</p>}
          </div>

          <div className="auth-form-row">
            <div className="form-group">
              <label className="form-label">Password *</label>
              <input
                type="password"
                name="password"
                className={`form-input${errors.password ? ' error' : ''}`}
                placeholder="Min. 6 characters"
                value={form.password}
                onChange={handleChange}
              />
              {errors.password && <p className="form-error">{errors.password}</p>}
            </div>
            <div className="form-group">
              <label className="form-label">Confirm Password *</label>
              <input
                type="password"
                name="confirmPassword"
                className={`form-input${errors.confirmPassword ? ' error' : ''}`}
                placeholder="Re-enter password"
                value={form.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && <p className="form-error">{errors.confirmPassword}</p>}
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
            {submitting ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;

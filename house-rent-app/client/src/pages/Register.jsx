import { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'renter',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const { name, email, password, confirmPassword, role } = formData;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) return setError('Passwords do not match.');
    setIsSubmitting(true);
    try {
      await register({ name, email, password, role });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Try a different email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="flex-grow flex items-center justify-center px-4 py-16"
      style={{ backgroundColor: '#e8e2d9' }}
    >
      <div className="hh-form-card w-full max-w-md p-10">
        {/* Header */}
        <p className="hh-label mb-3">Join HouseHunt</p>
        <h1 className="font-serif text-3xl font-bold text-[#1c1a17] mb-8">
          Create account
        </h1>

        {/* Error */}
        {error && (
          <div className="mb-6 font-mono text-xs text-[#8B3A2E] border border-[#8B3A2E] p-3">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="hh-label block mb-2" style={{ color: '#6b6558' }}>
              Full name
            </label>
            <input
              id="register-name"
              name="name"
              type="text"
              required
              value={name}
              onChange={handleChange}
              className="hh-input"
            />
          </div>

          {/* Email */}
          <div>
            <label className="hh-label block mb-2" style={{ color: '#6b6558' }}>
              Email
            </label>
            <input
              id="register-email"
              name="email"
              type="email"
              required
              value={email}
              onChange={handleChange}
              className="hh-input"
            />
          </div>

          {/* Password */}
          <div>
            <label className="hh-label block mb-2" style={{ color: '#6b6558' }}>
              Password
            </label>
            <input
              id="register-password"
              name="password"
              type="password"
              required
              value={password}
              onChange={handleChange}
              className="hh-input"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="hh-label block mb-2" style={{ color: '#6b6558' }}>
              Confirm password
            </label>
            <input
              id="register-confirm-password"
              name="confirmPassword"
              type="password"
              required
              value={confirmPassword}
              onChange={handleChange}
              className="hh-input"
            />
          </div>

          {/* Role */}
          <div>
            <label className="hh-label block mb-2" style={{ color: '#6b6558' }}>
              I am a
            </label>
            <select
              id="register-role"
              name="role"
              value={role}
              onChange={handleChange}
              className="hh-input"
              style={{ appearance: 'auto' }}
            >
              <option value="renter">Renter / Buyer</option>
              <option value="owner">Property Owner / Agent</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-rust w-full py-3 mt-2"
          >
            {isSubmitting ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#6b6558]">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-[#8B3A2E] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

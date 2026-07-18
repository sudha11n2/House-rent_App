import { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await login({ email: formData.email, password: formData.password });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please verify credentials.');
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
        <p className="hh-label mb-3">Welcome back</p>
        <h1 className="font-serif text-3xl font-bold text-[#1c1a17] mb-8">
          Sign in
        </h1>

        {/* Error */}
        {error && (
          <div className="mb-6 font-mono text-xs text-[#8B3A2E] border border-[#8B3A2E] p-3">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="hh-label block mb-2" style={{ color: '#6b6558' }}>
              Email
            </label>
            <input
              id="login-email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="hh-input"
              placeholder=""
            />
          </div>

          <div>
            <label className="hh-label block mb-2" style={{ color: '#6b6558' }}>
              Password
            </label>
            <input
              id="login-password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="hh-input"
              placeholder=""
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-rust w-full py-3 mt-2"
          >
            {isSubmitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#6b6558]">
          New to HouseHunt?{' '}
          <Link to="/register" className="font-semibold text-[#8B3A2E] hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

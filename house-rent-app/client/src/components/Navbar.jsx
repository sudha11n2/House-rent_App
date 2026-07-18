import { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLink = (to, label) => (
    <Link
      to={to}
      className={`text-xs font-mono uppercase tracking-widest transition-colors ${
        location.pathname === to
          ? 'text-[#1c1a17] font-semibold'
          : 'text-[#6b6558] hover:text-[#1c1a17]'
      }`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="hh-navbar">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between h-[60px] items-center">

          {/* Brand */}
          <Link to="/" className="flex items-center gap-2.5">
            <span className="font-mono text-[10px] text-[#8B3A2E] tracking-widest font-medium">No. 01</span>
            <span className="font-serif text-xl font-bold text-[#1c1a17]">HouseHunt</span>
          </Link>

          {/* Center Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLink('/', 'Listings')}
            {user && navLink('/add-property', 'Add Property')}
            {user && navLink('/my-properties', 'My Listings')}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <span className="text-xs text-[#6b6558] hidden sm:inline">
                  Hi, {user.name.split(' ')[0]}
                </span>
                <button
                  onClick={handleLogout}
                  className="btn-ghost text-[10px] py-1.5 px-4"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="btn-ghost text-[10px] py-1.5 px-4"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="btn-rust text-[10px] py-1.5 px-4"
                >
                  Get started
                </Link>
              </>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;

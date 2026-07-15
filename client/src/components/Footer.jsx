import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="hh-footer mt-auto">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand column */}
        <div className="md:col-span-1">
          <Link to="/" className="font-serif text-2xl font-bold text-[#f0ebe2]">
            HouseHunt
          </Link>
          <p className="mt-4 text-sm leading-relaxed" style={{ color: 'rgba(240,235,226,0.55)' }}>
            A digital marketplace for renters, buyers, and the agents between them.
          </p>
        </div>

        {/* Navigate */}
        <div>
          <p className="hh-label mb-4" style={{ color: '#8B3A2E' }}>Navigate</p>
          <ul className="space-y-3">
            {[['/', 'Listings'], ['/login', 'Sign in'], ['/register', 'Create account']].map(([to, label]) => (
              <li key={to}>
                <Link
                  to={to}
                  className="text-sm transition-colors hover:text-[#f0ebe2]"
                  style={{ color: 'rgba(240,235,226,0.6)' }}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Account */}
        <div>
          <p className="hh-label mb-4" style={{ color: '#8B3A2E' }}>Account</p>
          <ul className="space-y-3">
            {[['/login', 'Sign in'], ['/register', 'Create account'], ['/my-properties', 'My listings']].map(([to, label]) => (
              <li key={to + label}>
                <Link
                  to={to}
                  className="text-sm transition-colors hover:text-[#f0ebe2]"
                  style={{ color: 'rgba(240,235,226,0.6)' }}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Registered Office */}
        <div>
          <p className="hh-label mb-4" style={{ color: '#8B3A2E' }}>Registered Office</p>
          <address className="not-italic text-sm leading-relaxed" style={{ color: 'rgba(240,235,226,0.6)' }}>
            Plot 14, Sector 9<br />
            Hyderabad, Telangana<br />
            500081, India
          </address>
        </div>
      </div>

      {/* Bottom strip */}
      <div
        className="border-t flex flex-col sm:flex-row justify-between items-center px-6 lg:px-8 py-4 text-xs gap-2"
        style={{ borderColor: 'rgba(240,235,226,0.1)', color: 'rgba(240,235,226,0.35)' }}
      >
        <span>© {new Date().getFullYear()} HouseHunt</span>
        <span>Built for renters, buyers &amp; agents</span>
      </div>
    </footer>
  );
};

export default Footer;

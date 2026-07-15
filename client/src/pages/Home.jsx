import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import propertyService from '../services/propertyService';
import PropertyCard from '../components/PropertyCard';

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Search & Filter State
  const [location, setLocation] = useState('');
  const [lookingTo, setLookingTo] = useState('rent');
  const [activeQuery, setActiveQuery] = useState({ location: '', purpose: 'rent' });

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const params = { purpose: activeQuery.purpose };
        if (activeQuery.location) params.location = activeQuery.location;
        const data = await propertyService.getProperties(params);
        setProperties(data);
        setError('');
      } catch {
        setError('Failed to fetch listings. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, [activeQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    setActiveQuery({ location, purpose: lookingTo });
  };

  return (
    <div className="flex-grow flex flex-col">

      {/* ── Hero ───────────────────────────────── */}
      <section className="hh-hero px-6 lg:px-8 pt-20 pb-0">
        <div className="max-w-7xl mx-auto">

          {/* Eyebrow label */}
          <p className="hh-label mb-5">Registered listings across India</p>

          {/* Big heading */}
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-[#f0ebe2] max-w-2xl">
            Find your<br />next address.
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-base text-[rgba(240,235,226,0.65)] max-w-lg leading-relaxed">
            HouseHunt connects renters, buyers, and agents directly
            — real listings, real contact details, no middleman inbox.
          </p>

          {/* ── Search bar ──────────────────────── */}
          <form
            onSubmit={handleSearch}
            className="hh-search-bar mt-10 flex flex-col md:flex-row items-stretch"
          >
            {/* Location input */}
            <div className="flex-1 px-5 py-4 border-b md:border-b-0 md:border-r" style={{ borderColor: 'rgba(213,207,198,0.3)' }}>
              <p className="hh-label mb-1.5" style={{ color: 'rgba(107,101,88,0.8)' }}>City or locality</p>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Hyderabad, Gachibowli"
                className="w-full bg-transparent outline-none text-[#1c1a17] placeholder-[#9e9688] text-base font-sans"
              />
            </div>

            {/* Looking To dropdown */}
            <div className="px-5 py-4 border-b md:border-b-0 md:border-r min-w-[180px]" style={{ borderColor: 'rgba(213,207,198,0.3)' }}>
              <p className="hh-label mb-1.5" style={{ color: 'rgba(107,101,88,0.8)' }}>Looking to</p>
              <select
                value={lookingTo}
                onChange={(e) => setLookingTo(e.target.value)}
                className="w-full bg-transparent outline-none text-[#1c1a17] text-base font-serif cursor-pointer appearance-none"
              >
                <option value="rent">Rent</option>
                <option value="sale">Buy</option>
              </select>
            </div>

            {/* Search button */}
            <button type="submit" className="btn-rust px-10 py-5 text-[11px]">
              Search
            </button>
          </form>

          {/* Active count */}
          <p className="mt-3 mb-0 pb-4 font-mono text-[11px] tracking-widest" style={{ color: 'rgba(240,235,226,0.35)' }}>
            {loading ? 'Loading...' : `${properties.length} active listing${properties.length !== 1 ? 's' : ''}`}
            {' '}<span style={{ color: 'rgba(240,235,226,0.2)' }}>/</span>{' '}
            <span>Updated in real time</span>
          </p>
        </div>
      </section>

      {/* ── Recently Added ─────────────────────── */}
      <section className="px-6 lg:px-8 py-16" style={{ backgroundColor: '#f0ebe2' }}>
        <div className="max-w-7xl mx-auto">

          {/* Section header */}
          <div className="flex items-end justify-between mb-8 pb-5 border-b" style={{ borderColor: '#d5cfc6' }}>
            <div>
              <p className="hh-label mb-2">
                {activeQuery.purpose === 'rent' ? 'For rent' : 'For sale'}
              </p>
              <h2 className="font-serif text-3xl font-bold text-[#1c1a17]">
                {activeQuery.purpose === 'rent' ? 'Fresh on the market' : 'Properties for sale'}
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-[#6b6558]">
                {properties.length} result{properties.length !== 1 ? 's' : ''}
              </span>
              <Link
                to="/"
                onClick={() => setActiveQuery({ location: '', purpose: 'rent' })}
                className="btn-ghost text-[10px] py-2 px-4 whitespace-nowrap"
              >
                View all listings
              </Link>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="text-sm text-[#8B3A2E] py-4 font-mono">
              ⚠ {error}
            </div>
          )}

          {/* Loading skeleton */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse hh-card"
                  style={{ height: '340px' }}
                />
              ))}
            </div>
          ) : properties.length === 0 ? (
            <div className="py-20 text-center">
              <p className="font-mono text-xs tracking-widest text-[#6b6558] uppercase mb-4">
                Loading listings…
              </p>
              <p className="text-[#9e9688] text-sm">
                No properties matched your search. Try adjusting your filters.
              </p>
              <button
                onClick={() => { setLocation(''); setActiveQuery({ location: '', purpose: 'rent' }); }}
                className="btn-ghost mt-6 text-[10px] py-2 px-6"
              >
                Reset search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Value Prop / Three vantage points ─── */}
      <section className="px-6 lg:px-8 py-20" style={{ backgroundColor: '#ede8df' }}>
        <div className="max-w-7xl mx-auto">
          <p className="hh-label mb-4">For every stakeholder</p>
          <h2 className="font-serif text-4xl font-bold text-[#1c1a17] mb-12 max-w-lg">
            One platform, three vantage points
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: '#d5cfc6' }}>
            {[
              {
                role: 'Renter',
                body: 'Filter by city, price, and bedrooms, then message owners directly — no account required to browse.',
              },
              {
                role: 'Buyer',
                body: 'Compare sale listings side by side with transparent pricing and verified property specs.',
              },
              {
                role: 'Agent',
                body: 'List properties, manage inquiries in one dashboard, and track views on every listing you publish.',
              },
            ].map(({ role, body }) => (
              <div
                key={role}
                className="p-8"
                style={{ backgroundColor: '#ede8df' }}
              >
                <p className="hh-label mb-4">{role}</p>
                <p className="text-[#1c1a17] text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;

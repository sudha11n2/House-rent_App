import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import propertyService from '../services/propertyService';
import { AuthContext } from '../context/AuthContext';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showContact, setShowContact] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        setLoading(true);
        const data = await propertyService.getPropertyById(id);
        setProperty(data);
      } catch {
        setError('Failed to load property details.');
      } finally {
        setLoading(false);
      }
    };
    fetchPropertyDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex-grow flex items-center justify-center" style={{ backgroundColor: '#f0ebe2' }}>
        <p className="font-mono text-xs tracking-widest text-[#6b6558] uppercase animate-pulse">
          Loading listing…
        </p>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center py-20" style={{ backgroundColor: '#f0ebe2' }}>
        <p className="font-mono text-xs tracking-widest text-[#8B3A2E] uppercase mb-4">Not found</p>
        <h3 className="font-serif text-2xl font-bold text-[#1c1a17] mb-6">
          {error || 'Property not found'}
        </h3>
        <Link to="/" className="btn-ghost py-2 px-6 text-[10px]">
          ← Back to listings
        </Link>
      </div>
    );
  }

  const { title, description, location, rent, bedrooms, bathrooms, propertyType, imageUrl, owner, purpose } = property;

  const formattedRent = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(rent);

  return (
    <div className="flex-grow" style={{ backgroundColor: '#f0ebe2' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 text-left">

        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#6b6558] hover:text-[#1c1a17] mb-8 transition-colors"
        >
          ← Back to listings
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left: Image + Description */}
          <div className="lg:col-span-2 space-y-6">

            {/* Hero image */}
            <div className="relative overflow-hidden" style={{ aspectRatio: '16/9', backgroundColor: '#d5cfc6' }}>
              <img
                src={imageUrl || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80'}
                alt={title}
                className="object-cover w-full h-full"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80';
                }}
              />
              <div
                className={`absolute top-4 right-4 font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 ${
                  purpose === 'sale' ? 'bg-[#8B3A2E] text-white' : 'bg-[#1a2b22] text-[#f0ebe2]'
                }`}
              >
                {purpose === 'sale' ? 'For Sale' : 'For Rent'}
              </div>
            </div>

            {/* Info card */}
            <div className="hh-card p-8 space-y-5">
              {/* Badges */}
              <div className="flex items-center gap-3 flex-wrap">
                <span className="font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 bg-[#ede8df] text-[#1c1a17] border" style={{ borderColor: '#d5cfc6' }}>
                  {propertyType}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#6b6558]">
                  {location}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1c1a17] leading-tight">
                {title}
              </h1>

              {/* Specs */}
              <div className="flex items-center gap-8 text-sm border-y py-4" style={{ borderColor: '#d5cfc6' }}>
                <span className="font-mono text-xs">
                  <span className="text-[#1c1a17] font-semibold text-base">{bedrooms}</span>
                  <span className="text-[#6b6558] ml-1">bedrooms</span>
                </span>
                <span className="font-mono text-xs">
                  <span className="text-[#1c1a17] font-semibold text-base">{bathrooms}</span>
                  <span className="text-[#6b6558] ml-1">bathrooms</span>
                </span>
              </div>

              {/* Description */}
              <div>
                <p className="hh-label mb-3" style={{ color: '#6b6558' }}>About this property</p>
                <p className="text-sm text-[#4a4540] leading-relaxed whitespace-pre-line">
                  {description}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Price + Contact */}
          <div className="space-y-5">
            <div className="hh-card p-8 space-y-6" style={{ borderTop: '3px solid #8B3A2E' }}>
              {/* Price */}
              <div>
                <p className="hh-label mb-2" style={{ color: '#6b6558' }}>
                  {purpose === 'rent' ? 'Monthly rent' : 'Asking price'}
                </p>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-serif text-3xl font-bold text-[#1c1a17]">{formattedRent}</span>
                  {purpose === 'rent' && (
                    <span className="font-mono text-xs text-[#6b6558]">/month</span>
                  )}
                </div>
              </div>

              {/* Owner info */}
              <div className="border-t pt-6" style={{ borderColor: '#d5cfc6' }}>
                <p className="hh-label mb-4" style={{ color: '#6b6558' }}>Owner information</p>

                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-10 h-10 flex items-center justify-center font-bold text-[#f0ebe2] text-sm"
                    style={{ backgroundColor: '#1a2b22' }}
                  >
                    {owner?.name ? owner.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-[#1c1a17]">{owner?.name || 'Owner'}</p>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-[#6b6558]">
                      {owner?.role || 'Property owner'}
                    </p>
                  </div>
                </div>

                {showContact ? (
                  <div className="p-4 border" style={{ backgroundColor: '#ede8df', borderColor: '#d5cfc6' }}>
                    <p className="hh-label mb-2" style={{ color: '#6b6558' }}>Direct email</p>
                    <a
                      href={`mailto:${owner?.email}`}
                      className="block text-sm font-semibold text-[#8B3A2E] hover:underline break-all"
                    >
                      {owner?.email}
                    </a>
                    <p className="font-mono text-[10px] text-[#6b6558] mt-2">
                      Click above to send an inquiry directly.
                    </p>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      if (!user) {
                        alert('Please log in to contact the property owner.');
                        return;
                      }
                      setShowContact(true);
                    }}
                    className="btn-rust w-full py-3 text-[11px]"
                  >
                    Contact owner
                  </button>
                )}

                {!user && (
                  <p className="font-mono text-[10px] text-center text-[#6b6558] mt-3">
                    Please{' '}
                    <Link to="/login" className="text-[#8B3A2E] hover:underline">
                      sign in
                    </Link>{' '}
                    to contact the owner.
                  </p>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;

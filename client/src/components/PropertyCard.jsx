import { Link } from 'react-router-dom';

const PropertyCard = ({ property, showActions, onEdit, onDelete }) => {
  const { _id, title, location, rent, bedrooms, bathrooms, propertyType, imageUrl, purpose } = property;

  const formattedRent = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(rent);

  return (
    <div className="hh-card flex flex-col overflow-hidden group">
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: '210px', backgroundColor: '#d5cfc6' }}>
        <img
          src={imageUrl || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80';
          }}
        />

        {/* Purpose badge */}
        <div
          className={`absolute top-3 right-3 font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 ${
            purpose === 'sale'
              ? 'bg-[#8B3A2E] text-white'
              : 'bg-[#1a2b22] text-[#f0ebe2]'
          }`}
        >
          {purpose === 'sale' ? 'For Sale' : 'For Rent'}
        </div>

        {/* Type badge */}
        <div className="absolute top-3 left-3 font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 bg-[rgba(240,235,226,0.92)] text-[#1c1a17]">
          {propertyType}
        </div>
      </div>

      {/* Details */}
      <div className="p-5 flex flex-col flex-grow text-left">
        {/* Price */}
        <div className="mb-3 flex items-baseline gap-1.5">
          <span className="font-serif text-2xl font-bold text-[#1c1a17]">
            {formattedRent}
          </span>
          {purpose === 'rent' && (
            <span className="font-mono text-xs text-[#6b6558]">/month</span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-serif text-base font-bold text-[#1c1a17] mb-1.5 line-clamp-2 leading-snug group-hover:text-[#8B3A2E] transition-colors">
          {title}
        </h3>

        {/* Location */}
        <p className="text-sm text-[#6b6558] mb-4 line-clamp-1">
          {location}
        </p>

        {/* Specs */}
        <div
          className="flex items-center gap-4 text-xs text-[#6b6558] border-t pt-4 mt-auto"
          style={{ borderColor: '#d5cfc6' }}
        >
          <span className="font-mono">
            <span className="text-[#1c1a17] font-semibold">{bedrooms}</span> bed
          </span>
          <span style={{ color: '#d5cfc6' }}>|</span>
          <span className="font-mono">
            <span className="text-[#1c1a17] font-semibold">{bathrooms}</span> bath
          </span>
        </div>

        {/* Actions */}
        <div className="mt-4">
          {showActions ? (
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(_id)}
                className="flex-1 font-mono text-[10px] uppercase tracking-wider py-2 px-3 border transition-colors cursor-pointer hover:bg-[#1a2b22] hover:text-[#f0ebe2]"
                style={{ borderColor: '#d5cfc6', color: '#1c1a17' }}
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(_id)}
                className="flex-1 font-mono text-[10px] uppercase tracking-wider py-2 px-3 border border-[#8B3A2E] text-[#8B3A2E] transition-colors cursor-pointer hover:bg-[#8B3A2E] hover:text-white"
              >
                Delete
              </button>
            </div>
          ) : (
            <Link
              to={`/properties/${_id}`}
              className="btn-rust w-full text-[10px] py-2.5"
            >
              View details →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;

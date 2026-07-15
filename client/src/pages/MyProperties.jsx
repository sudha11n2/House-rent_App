import { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import propertyService from '../services/propertyService';
import PropertyCard from '../components/PropertyCard';

const MyProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { user, loading: authLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) navigate('/login');
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const fetchUserProperties = async () => {
      if (!user) return;
      try {
        setLoading(true);
        const data = await propertyService.getProperties({ owner: user._id });
        setProperties(data);
      } catch {
        setError('Could not retrieve your property listings.');
      } finally {
        setLoading(false);
      }
    };
    fetchUserProperties();
  }, [user]);

  const handleEdit = (id) => navigate(`/edit-property/${id}`);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      try {
        await propertyService.deleteProperty(id, user.token);
        setProperties(properties.filter((p) => p._id !== id));
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete listing.');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex-grow flex items-center justify-center" style={{ backgroundColor: '#f0ebe2' }}>
        <p className="font-mono text-xs tracking-widest text-[#6b6558] uppercase animate-pulse">
          Loading your listings…
        </p>
      </div>
    );
  }

  return (
    <div className="flex-grow" style={{ backgroundColor: '#f0ebe2' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4 pb-6 border-b" style={{ borderColor: '#d5cfc6' }}>
          <div>
            <p className="hh-label mb-2">Your account</p>
            <h1 className="font-serif text-4xl font-bold text-[#1c1a17]">My listings</h1>
            <p className="text-sm text-[#6b6558] mt-1">
              Manage your published properties and make updates.
            </p>
          </div>
          <Link to="/add-property" className="btn-rust text-[10px] py-2.5 px-6 whitespace-nowrap">
            + Add new property
          </Link>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-8 font-mono text-xs text-[#8B3A2E] border border-[#8B3A2E] p-3">
            ⚠ {error}
          </div>
        )}

        {/* Empty state */}
        {properties.length === 0 ? (
          <div className="text-center py-24 border" style={{ borderColor: '#d5cfc6' }}>
            <p className="font-mono text-xs tracking-widest text-[#6b6558] uppercase mb-4">
              No listings yet
            </p>
            <h3 className="font-serif text-2xl font-bold text-[#1c1a17] mb-4">
              Publish your first property
            </h3>
            <p className="text-sm text-[#6b6558] mb-8 max-w-sm mx-auto">
              Get started by adding your first rental or sale property so renters and buyers can find it.
            </p>
            <Link to="/add-property" className="btn-rust text-[10px] py-2.5 px-8">
              Create your first listing
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard
                key={property._id}
                property={property}
                showActions={true}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProperties;

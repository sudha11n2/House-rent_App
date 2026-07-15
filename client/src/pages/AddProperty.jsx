import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import propertyService from '../services/propertyService';

const AddProperty = () => {
  const { id } = useParams();
  const isEditMode = !!id;
  const navigate = useNavigate();
  const { user, loading: authLoading } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    rent: '',
    bedrooms: '',
    bathrooms: '',
    propertyType: 'Apartment',
    purpose: 'rent',
    imageUrl: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) navigate('/login');
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (isEditMode && user) {
      const fetchProperty = async () => {
        setFetchingData(true);
        try {
          const data = await propertyService.getPropertyById(id);
          if (data.owner._id !== user._id && user.role !== 'admin') {
            setError('You are not authorized to edit this property.');
            setTimeout(() => navigate('/'), 2000);
            return;
          }
          setFormData({
            title: data.title,
            description: data.description,
            location: data.location,
            rent: data.rent.toString(),
            bedrooms: data.bedrooms.toString(),
            bathrooms: data.bathrooms.toString(),
            propertyType: data.propertyType,
            purpose: data.purpose || 'rent',
            imageUrl: data.imageUrl,
          });
        } catch {
          setError('Failed to fetch property details.');
        } finally {
          setFetchingData(false);
        }
      };
      fetchProperty();
    }
  }, [id, isEditMode, user, navigate]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const fallbackImages = [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    ];
    const randomImage = fallbackImages[Math.floor(Math.random() * fallbackImages.length)];

    const propertyData = {
      ...formData,
      imageUrl: formData.imageUrl.trim() || randomImage,
      rent: Number(formData.rent),
      bedrooms: Number(formData.bedrooms),
      bathrooms: Number(formData.bathrooms),
    };

    try {
      if (isEditMode) {
        await propertyService.updateProperty(id, propertyData, user.token);
      } else {
        await propertyService.createProperty(propertyData, user.token);
      }
      navigate('/my-properties');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please check your input.');
    } finally {
      setLoading(false);
    }
  };

  if (fetchingData) {
    return (
      <div className="flex-grow flex items-center justify-center" style={{ backgroundColor: '#f0ebe2' }}>
        <p className="font-mono text-xs tracking-widest text-[#6b6558] uppercase animate-pulse">
          Loading listing details…
        </p>
      </div>
    );
  }

  // Shared input class
  const inputClass = 'hh-input mt-1';
  const labelClass = 'hh-label block';

  return (
    <div className="flex-grow px-4 py-12" style={{ backgroundColor: '#e8e2d9' }}>
      <div className="max-w-2xl mx-auto">
        <div className="hh-form-card p-8 sm:p-10">

          {/* Header */}
          <p className="hh-label mb-3">{isEditMode ? 'Edit listing' : 'New listing'}</p>
          <h1 className="font-serif text-3xl font-bold text-[#1c1a17] mb-2">
            {isEditMode ? 'Edit property listing' : 'List a new property'}
          </h1>
          <p className="text-sm text-[#6b6558] mb-8">
            Fill in the details below. Renters and buyers will see this listing instantly.
          </p>

          {/* Error */}
          {error && (
            <div className="mb-6 font-mono text-xs text-[#8B3A2E] border border-[#8B3A2E] p-3">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Title */}
            <div>
              <label className={labelClass} style={{ color: '#6b6558' }}>Property title</label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Premium 3BHK Flat with Lake View"
                className={inputClass}
              />
            </div>

            {/* Description */}
            <div>
              <label className={labelClass} style={{ color: '#6b6558' }}>Description</label>
              <textarea
                name="description"
                required
                rows="4"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the property, key features, amenities, nearby spots, utilities included, etc."
                className={inputClass}
                style={{ resize: 'vertical' }}
              />
            </div>

            {/* Location + Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClass} style={{ color: '#6b6558' }}>Location</label>
                <input
                  type="text"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Jubilee Hills, Hyderabad"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass} style={{ color: '#6b6558' }}>
                  {formData.purpose === 'rent' ? 'Monthly rent (INR)' : 'Total price (INR)'}
                </label>
                <input
                  type="number"
                  name="rent"
                  required
                  min="0"
                  value={formData.rent}
                  onChange={handleChange}
                  placeholder={formData.purpose === 'rent' ? 'e.g. 25000' : 'e.g. 7500000'}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Specs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              <div>
                <label className={labelClass} style={{ color: '#6b6558' }}>Bedrooms</label>
                <input
                  type="number"
                  name="bedrooms"
                  required
                  min="0"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  placeholder="e.g. 2"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass} style={{ color: '#6b6558' }}>Bathrooms</label>
                <input
                  type="number"
                  name="bathrooms"
                  required
                  min="0"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  placeholder="e.g. 1"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass} style={{ color: '#6b6558' }}>Type</label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="Apartment">Apartment</option>
                  <option value="House">House</option>
                  <option value="Villa">Villa</option>
                  <option value="Studio">Studio</option>
                  <option value="Condo">Condo</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className={labelClass} style={{ color: '#6b6558' }}>Listed for</label>
                <select
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="rent">Renting</option>
                  <option value="sale">Selling</option>
                </select>
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label className={labelClass} style={{ color: '#6b6558' }}>
                Property image URL <span className="normal-case text-[#9e9688]">(optional)</span>
              </label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="Leave empty for a default image"
                className={inputClass}
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="btn-rust w-full py-3 text-[11px]"
              >
                {loading
                  ? 'Saving…'
                  : isEditMode
                  ? 'Save changes'
                  : 'Publish listing'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;

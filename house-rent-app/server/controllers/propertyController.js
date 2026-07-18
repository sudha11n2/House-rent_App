const Property = require('../models/Property');

// @desc Get all properties (with search & filter)
// @route GET /api/properties
// @access Public
const getProperties = async (req, res) => {
  try {
    const { location, minRent, maxRent, propertyType, owner, purpose } = req.query;
    
    let query = {};
    
    // Filter by owner (for my properties page)
    if (owner) {
      query.owner = owner;
    }
    
    // Filter by purpose (rent vs sale)
    if (purpose) {
      query.purpose = purpose;
    }
    
    // Search by location (case-insensitive search)
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }
    
    // Filter by property type
    if (propertyType && propertyType !== 'All' && propertyType !== '') {
      query.propertyType = propertyType;
    }
    
    // Filter by rent range
    if (minRent || maxRent) {
      query.rent = {};
      if (minRent) query.rent.$gte = Number(minRent);
      if (maxRent) query.rent.$lte = Number(maxRent);
    }
    
    const properties = await Property.find(query).populate('owner', 'name email').sort({ createdAt: -1 });
    res.json(properties);
  } catch (error) {
    console.error('Get properties error:', error.message);
    res.status(500).json({ message: 'Server error retrieving properties' });
  }
};

// @desc Get property by ID
// @route GET /api/properties/:id
// @access Public
const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('owner', 'name email');
    
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    
    res.json(property);
  } catch (error) {
    console.error('Get property by ID error:', error.message);
    res.status(500).json({ message: 'Server error retrieving property' });
  }
};

// @desc Create a property listing
// @route POST /api/properties
// @access Private
const createProperty = async (req, res) => {
  try {
    const { title, description, location, rent, bedrooms, bathrooms, propertyType, imageUrl, purpose } = req.body;
    
    if (!title || !description || !location || !rent || !bedrooms || !bathrooms || !propertyType || !imageUrl) {
      return res.status(400).json({ message: 'Please add all required fields' });
    }
    
    const property = await Property.create({
      title,
      description,
      location,
      rent: Number(rent),
      bedrooms: Number(bedrooms),
      bathrooms: Number(bathrooms),
      propertyType,
      imageUrl,
      purpose: purpose || 'rent',
      owner: req.user.id,
    });
    
    res.status(201).json(property);
  } catch (error) {
    console.error('Create property error:', error.message);
    res.status(500).json({ message: 'Server error creating property listing' });
  }
};

// @desc Update a property listing
// @route PUT /api/properties/:id
// @access Private
const updateProperty = async (req, res) => {
  try {
    const { title, description, location, rent, bedrooms, bathrooms, propertyType, imageUrl, purpose } = req.body;
    
    let property = await Property.findById(req.params.id);
    
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    
    // Check if logged-in user is the owner
    if (property.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to edit this property listing' });
    }
    
    property.title = title || property.title;
    property.description = description || property.description;
    property.location = location || property.location;
    property.rent = rent !== undefined ? Number(rent) : property.rent;
    property.bedrooms = bedrooms !== undefined ? Number(bedrooms) : property.bedrooms;
    property.bathrooms = bathrooms !== undefined ? Number(bathrooms) : property.bathrooms;
    property.propertyType = propertyType || property.propertyType;
    property.imageUrl = imageUrl || property.imageUrl;
    property.purpose = purpose || property.purpose;
    
    const updatedProperty = await property.save();
    res.json(updatedProperty);
  } catch (error) {
    console.error('Update property error:', error.message);
    res.status(500).json({ message: 'Server error updating property listing' });
  }
};

// @desc Delete a property listing
// @route DELETE /api/properties/:id
// @access Private
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    
    // Check if logged-in user is the owner
    if (property.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this property listing' });
    }
    
    await Property.findByIdAndDelete(req.params.id);
    res.json({ message: 'Property listing deleted successfully' });
  } catch (error) {
    console.error('Delete property error:', error.message);
    res.status(500).json({ message: 'Server error deleting property listing' });
  }
};

module.exports = {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
};

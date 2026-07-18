// Script to directly insert 7 Indian house listings into MongoDB
// Run: node insertListings.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Property = require('./models/Property');

const run = async () => {
  await mongoose.connect(process.env.MONGO_URL);
  console.log('✅ Connected to MongoDB');

  // Create or find landlord
  let user = await User.findOne({ email: 'landlord@houserent.com' });
  if (!user) {
    const hashed = await bcrypt.hash('password123', 10);
    user = await User.create({ name: 'Ravi Kumar', email: 'landlord@houserent.com', password: hashed });
    console.log('Created landlord: landlord@houserent.com / password123');
  }

  const listings = [
    {
      title: 'Modern 3BHK Villa – Jubilee Hills',
      description: 'Spacious villa in the heart of Jubilee Hills with a private terrace, modular kitchen, Italian marble flooring, 24/7 security and power backup. Close to top schools, hospitals and shopping malls. Covered parking for 2 cars. Peaceful gated community with CCTV surveillance.',
      location: 'Jubilee Hills, Hyderabad',
      rent: 75000,
      bedrooms: 3,
      bathrooms: 3,
      propertyType: 'Villa',
      purpose: 'rent',
      imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1400&q=85',
      owner: user._id,
    },
    {
      title: 'Premium 2BHK Flat – HITEC City',
      description: 'Semi-furnished flat in a prime HITEC City gated community. Features a contemporary modular kitchen, large balcony with tech park views, 100% power backup, high-speed fibre internet, visitor parking and gym access. Walking distance to Cyber Towers and Mindspace.',
      location: 'HITEC City, Hyderabad',
      rent: 35000,
      bedrooms: 2,
      bathrooms: 2,
      propertyType: 'Apartment',
      purpose: 'rent',
      imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1400&q=85',
      owner: user._id,
    },
    {
      title: 'Elegant 3BHK Apartment – Koramangala',
      description: 'Fully furnished premium apartment located in the vibrant Koramangala locality of Bengaluru. Features hardwood flooring, modular kitchen, smart lighting, rooftop garden access, backup generator, and a dedicated workspace. Surrounded by top restaurants, cafes and startup offices.',
      location: 'Koramangala, Bengaluru',
      rent: 45000,
      bedrooms: 3,
      bathrooms: 2,
      propertyType: 'Apartment',
      purpose: 'rent',
      imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1400&q=85',
      owner: user._id,
    },
    {
      title: 'Luxury 4BHK Independent House – Whitefield',
      description: 'Stunning independent house in a prime Whitefield location with a beautifully landscaped private garden, home theatre, solar panels, EV charging point, modular kitchen with chimney, and smart home automation. Close to ITPL, Phoenix Marketcity and top international schools.',
      location: 'Whitefield, Bengaluru',
      rent: 25000000,
      bedrooms: 4,
      bathrooms: 4,
      propertyType: 'House',
      purpose: 'sale',
      imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=85',
      owner: user._id,
    },
    {
      title: 'Affordable 1BHK Studio – Electronic City',
      description: 'Well-maintained studio apartment ideal for IT professionals in Electronic City, Bengaluru. Fully furnished with queen-size bed, wardrobe, TV, and kitchen appliances. Includes high-speed Wi-Fi, 24/7 security, power backup and dedicated parking. 2 km from Infosys and Wipro.',
      location: 'Electronic City, Bengaluru',
      rent: 13500,
      bedrooms: 1,
      bathrooms: 1,
      propertyType: 'Studio',
      purpose: 'rent',
      imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1400&q=85',
      owner: user._id,
    },
    {
      title: 'Smart City 3BHK Flat – GIFT City',
      description: 'Premium apartment in Gujarat International Finance Tec-City (GIFT City), India\'s operational smart city. Features automated climate control, uninterrupted power via underground grid, district cooling, smart metering, secure underground parking, and direct access to GIFT City\'s business district and metro.',
      location: 'GIFT City, Gandhinagar',
      rent: 52000,
      bedrooms: 3,
      bathrooms: 3,
      propertyType: 'Apartment',
      purpose: 'rent',
      imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=85',
      owner: user._id,
    },
    {
      title: 'Heritage Bungalow – Banjara Hills',
      description: 'Grand independent bungalow on a 600 sq. yard plot in the prestigious Banjara Hills locality of Hyderabad. Features 12-ft ornate ceilings, original teak woodwork, a private swimming pool, manicured garden, separate servant quarters, and covered parking for 3 cars. Iconic neighbourhood near top hospitals and malls.',
      location: 'Banjara Hills, Hyderabad',
      rent: 75000000,
      bedrooms: 5,
      bathrooms: 5,
      propertyType: 'House',
      purpose: 'sale',
      imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1400&q=85',
      owner: user._id,
    },
  ];

  const inserted = await Property.insertMany(listings);
  console.log(`✅ Successfully inserted ${inserted.length} house listings into MongoDB!`);
  await mongoose.disconnect();
  console.log('Disconnected. Done!');
};

run().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});

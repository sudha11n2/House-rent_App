const User = require('../models/User');
const Property = require('../models/Property');
const bcrypt = require('bcryptjs');

const seedDB = async () => {
  try {
    const propertyCount = await Property.countDocuments();
    if (propertyCount > 0) {
      console.log(`Database already has ${propertyCount} property listings. Skipping seeding.`);
      return;
    }

    console.log('Seeding database with Indian city listings (Rent & Sale)...');

    // Create a seed owner
    let owner = await User.findOne({ email: 'landlord@example.com' });
    if (!owner) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('password123', salt);
      owner = await User.create({
        name: 'Ravi Kumar',
        email: 'landlord@example.com',
        password: hashedPassword,
        role: 'owner',
      });
      console.log('Created demo landlord owner: landlord@example.com / password123');
    }

    // Create a seed admin
    let admin = await User.findOne({ email: 'admin@househunt.com' });
    if (!admin) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      admin = await User.create({
        name: 'Admin Moderator',
        email: 'admin@househunt.com',
        password: hashedPassword,
        role: 'admin',
      });
      console.log('Created admin account: admin@househunt.com / admin123');
    }

    const sampleProperties = [
      {
        title: 'Luxury 4BHK Villa in Jubilee Hills',
        description: 'Stunning fully-furnished luxury villa in the prestigious Jubilee Hills area of Hyderabad. Features a private swimming pool, modular kitchen, Italian marble flooring, home theatre, three-car garage, and a beautifully landscaped garden. Ideal for premium buyers.',
        location: 'Jubilee Hills, Hyderabad',
        rent: 85000000, // 8.5 Crores
        bedrooms: 4,
        bathrooms: 4,
        propertyType: 'Villa',
        purpose: 'sale',
        status: 'approved',
        imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1400&q=85',
        owner: owner._id,
      },
      {
        title: 'Modern 3BHK Flat in HITEC City',
        description: 'Premium semi-furnished 3BHK apartment in the heart of HITEC City, Hyderabad. Perfect for IT professionals. Features two covered car parks, 24/7 security, power backup, a well-equipped gym, rooftop terrace, kids\' play area, and is walking distance from Cyber Towers.',
        location: 'HITEC City, Hyderabad',
        rent: 42000, // Monthly Rent
        bedrooms: 3,
        bathrooms: 3,
        propertyType: 'Apartment',
        purpose: 'rent',
        status: 'approved',
        imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1400&q=85',
        owner: owner._id,
      },
      {
        title: 'Elegant 2BHK Flat in Gachibowli',
        description: 'Beautifully designed 2BHK apartment located in Gachibowli\'s most sought-after gated community. Features semi-modular kitchen, premium wooden flooring, large balcony with city views, covered parking, high-speed broadband, and 24-hour security.',
        location: 'Gachibowli, Hyderabad',
        rent: 28000, // Monthly Rent
        bedrooms: 2,
        bathrooms: 2,
        propertyType: 'Apartment',
        purpose: 'rent',
        status: 'approved',
        imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1400&q=85',
        owner: owner._id,
      },
      {
        title: 'Spacious 3BHK Villa in Whitefield',
        description: 'Gorgeous independent villa in the fast-growing Whitefield area of Bengaluru. Features a terrace garden, smart home automation, solar panels, open kitchen, and a large garden. Close to ITPL, Phoenix Mall, and top international schools.',
        location: 'Whitefield, Bengaluru',
        rent: 18000000, // 1.8 Crores
        bedrooms: 3,
        bathrooms: 3,
        propertyType: 'Villa',
        purpose: 'sale',
        status: 'approved',
        imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=85',
        owner: owner._id,
      },
      {
        title: 'Premium 2BHK Apartment in Koramangala',
        description: 'Fully-furnished chic apartment in Koramangala, the startup capital of Bengaluru. Features a stylish open-plan living space, high-speed internet, modular kitchen, and power backup. Steps from Indiranagar restaurants and cafes.',
        location: 'Koramangala, Bengaluru',
        rent: 38000, // Monthly Rent
        bedrooms: 2,
        bathrooms: 2,
        propertyType: 'Apartment',
        purpose: 'rent',
        status: 'approved',
        imageUrl: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1400&q=85',
        owner: owner._id,
      },
      {
        title: 'Affordable 1BHK Studio in Electronic City',
        description: 'Comfortable and well-maintained studio apartment ideal for IT professionals. Features double bed and wardrobe, modular kitchen, 24/7 security, power backup, and dedicated parking. Close to tech campus offices.',
        location: 'Electronic City, Bengaluru',
        rent: 14500, // Monthly Rent
        bedrooms: 1,
        bathrooms: 1,
        propertyType: 'Studio',
        purpose: 'rent',
        status: 'approved',
        imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1400&q=85',
        owner: owner._id,
      },
      {
        title: 'Smart City Penthouse in Dholera SIR',
        description: 'Ultra-modern penthouse in India\'s first greenfield smart city. Features AI-powered smart home controls, rooftop solar energy, dedicated EV charging port, fiber connectivity, and seamless access to the smart transit system.',
        location: 'Dholera SIR, Gujarat',
        rent: 4800000, // 48 Lakhs
        bedrooms: 3,
        bathrooms: 3,
        propertyType: 'Apartment',
        purpose: 'sale',
        status: 'approved',
        imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1400&q=85',
        owner: owner._id,
      },
      {
        title: 'Luxury 4BHK in GIFT City Smart Zone',
        description: 'Premium luxury apartment in GIFT City, Gandhinagar. Features district cooling system, automated climate control, smart metering, uninterrupted power, and proximity to the international financial services zone.',
        location: 'GIFT City, Gandhinagar',
        rent: 6500000, // 65 Lakhs
        bedrooms: 4,
        bathrooms: 3,
        propertyType: 'Apartment',
        purpose: 'sale',
        status: 'approved',
        imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=85',
        owner: owner._id,
      },
      {
        title: 'Modern 3BHK Flat in Amaravati',
        description: 'Newly built premium apartment in Andhra Pradesh\'s emerging planned capital city. Features green building design, solar power backup, EV charging stations, and a modern open-concept layout.',
        location: 'Amaravati, Andhra Pradesh',
        rent: 32000, // Monthly Rent
        bedrooms: 3,
        bathrooms: 2,
        propertyType: 'Apartment',
        purpose: 'rent',
        status: 'approved',
        imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85',
        owner: owner._id,
      },
      {
        title: 'Heritage Bungalow in Banjara Hills',
        description: 'Grand and graceful independent heritage bungalow set on 600 sq. yards in the Banjara Hills. Features teak woodwork, 12-ft ornate ceilings, private swimming pool, manicured lawn, and stunning views of the city.',
        location: 'Banjara Hills, Hyderabad',
        rent: 120000000, // 12 Crores
        bedrooms: 5,
        bathrooms: 5,
        propertyType: 'House',
        purpose: 'sale',
        status: 'approved',
        imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1400&q=85',
        owner: owner._id,
      },
    ];

    await Property.insertMany(sampleProperties);
    console.log(`✅ Database seeded with ${sampleProperties.length} Indian listings (Rent & Sale)!`);
  } catch (error) {
    console.error('Error seeding database:', error.message);
  }
};

module.exports = seedDB;

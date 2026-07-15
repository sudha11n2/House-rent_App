const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URL;

    if (!uri) {
      throw new Error(
        'MONGO_URL missing in .env'
      );
    }

    const conn = await mongoose.connect(uri);

    console.log(
      `MongoDB Connected: ${conn.connection.host}`
    );

    // Seed only if needed
    const seedDB = require('./seed');
    await seedDB();

  } catch (error) {
    console.error(
      `MongoDB Connection Error: ${error.message}`
    );

    process.exit(1);
  }
};

module.exports = connectDB;
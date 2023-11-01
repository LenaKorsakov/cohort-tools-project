const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGODB_URL)
  .then((db) =>
    console.log(`Connected to Database: "${db.connections[0].name}"`, 'db:', db)
  )
  .catch((err) => console.error('Error connecting to MongoDB', err));

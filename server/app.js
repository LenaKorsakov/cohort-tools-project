require('dotenv').config({ path: './.env.sample' });
require('./config/dbConnect');

const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');

const {
  errorHandler,
  notFoundHandler,
} = require('./middleware/error-handling');

// INITIALIZE EXPRESS APP
const app = express();

// MIDDLEWARE
app.use(cors());
// app.use(cors({ origin: ["http://localhost:5173"] }));
app.use(morgan('dev'));
app.use(express.json());
//Using Helmet in Node.js to secure your application
app.use(helmet());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api/cohorts', require('./routes/cohort.routes'));
app.use('/api/students', require('./routes/student.routes'));

// ROUTES
app.get('/docs', (req, res) => {
  res.sendFile(__dirname + '/views/docs.html');
});

app.use(errorHandler);
app.use(notFoundHandler);

// START SERVER
app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});

module.exports = app;

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

const analyticsRoutes = require('./routes/analytics')
const authRoutes = require('./routes/auth')
const categotyRoutes = require('./routes/category')
const orderRoutes = require('./routes/order')
const positionRoutes = require('./routes/position')
const keys = require('./config/keys')
const app = express();

mongoose.connect(keys.mongoURI)
  .then(() => console.log('Success to connect database'))
  .catch(error => console.log(error) )

app.use(passport.initialize());
app.use('/uploads', express.static('uploads'));
require('./middleware/passport')(passport);

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(require('cors')());

app.use('/api/analytics', analyticsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/category', categotyRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/position', positionRoutes);

module.exports = app;
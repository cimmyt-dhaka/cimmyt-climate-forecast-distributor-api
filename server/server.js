const
  // { join } = require('path'),
  express = require('express'),
  { connect } = require('mongoose'),
  // cors = require('cors'),
  port = process.env.PORT || 5000,

  { mongoURI } = require('./config/keys.js'),
  mungbean = require('./routes/api/mungbean.js'),
  faw = require('./routes/api/faw.js'),

  app = express(),

  appInit = async () => {
    try {
      await connect(mongoURI);
      console.log("MongoDB connected");

      app.listen(
        port,
        () => { console.log(`Server started on port ${ port }`); }
      );
    } catch (error) {
      console.error(error);
    }
  };

// app.use(cors());

app.use('/api/mungbean', mungbean);
app.use('/api/faw-forecasts', faw);

appInit();

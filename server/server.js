const
  // { join } = require('path'),
  express = require('express'),
  { connect } = require('mongoose'),
  // cors = require('cors'),
  { PORT: port } = process.env,

  { mongoURI } = require('./config/keys.js'),
  mungbean = require('./routes/api/mungbean.js'),

  app = express(),

  appInit = async () => {
    try {
      await connect(mongoURI);
      console.log("MongoDB connected");

      app.listen(
        port || 5000,
        () => { console.log(`Server started on port ${port || 5000}`); }
      );
    } catch (error) {
      console.error(error);
    }
  };

// app.use('/', express.static(join(__dirname, 'public')));
// app.use(cors());

app.use('/api/mungbean', mungbean);

appInit();

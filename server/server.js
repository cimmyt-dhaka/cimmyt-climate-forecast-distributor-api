const
  express = require('express'),
  cors = require('cors'),
  { connect } = require('mongoose'),
  port = process.env.PORT || 5000,

  { mongoURI } = require('./config/keys.js'),
  mungbean = require('./routes/api/mungbean.js'),
  faw = require('./routes/api/faw.js'),

  app = express();

app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE'], allowedHeaders: ['Content-Type'] }));

app.use('/api/mungbean', mungbean);
app.use('/api/faw-forecasts', faw);

connect(mongoURI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(port, () => {
      console.log(`Server started on port ${ port }`);
    });
  })
  .catch(err => {
    console.error(err);
  });

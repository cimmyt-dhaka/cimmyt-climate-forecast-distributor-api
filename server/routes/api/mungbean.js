const
  express = require("express"),
  router = express.Router(),

  callback = require("../../functions/mungbean/router-callback.js");

// @route    GET /api/mungbean/ivr-provider
// @desc     Get aggregated data for season and area
// @access   Public
router.get("/ivr-provider", callback);

// @route    GET /api/mungbean/ivr-developer
// @desc     Get aggregated data for season and area
// @access   Public
router.get("/ivr-developer", callback);

module.exports = router;

const
  express = require("express"),
  router = express.Router(),

  callback = require("../../functions/mungbean/router-callback.js"),
  callbackV230317 = require("../../functions/mungbean/router-callback-v230317.js");

// @route    GET /api/mungbean/ivr-provider
// @desc     Get aggregated data for season and area
// @access   Public
router.get("/ivr-provider", callback);

// @route    GET /api/mungbean/ivr-developer
// @desc     Get aggregated data for season and area
// @access   Public
router.get("/ivr-developer", callback);

// @route    GET /api/mungbean/ivr-provider-v230317
// @desc     Get forecast based directives of audio file sequences to generate voice calls
// @access   Public
router.get("/ivr-provider-v230317", callbackV230317);

// @route    GET /api/mungbean/ivr-provider-v230317
// @desc     Get forecast based directives of audio file sequences to generate voice calls
// @access   Public
router.get("/ivr-developer-v230317", callbackV230317);

module.exports = router;

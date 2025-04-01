const
  express = require("express"),
  router = express.Router(),

  callback = require("../../functions/mungbean/router-callback.js"),
  callbackV230317 = require("../../functions/mungbean/router-callback-v230317.js"),
  callbackV240317 = require("../../functions/mungbean/router-callback-v240317.js"),
  callbackCodesV240317 = require("../../functions/mungbean/router-callback-codes-v240317.js"),
  callbackYear = require("../../functions/mungbean/router-callback-year.js");

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

// @route    GET /api/mungbean/ivr-developer-v230317
// @desc     Get forecast based directives of audio file sequences to generate voice calls
// @access   Public
router.get("/ivr-developer-v230317", callbackV230317);

// @route    GET /api/mungbean/ivr-codes-v240317
// @desc     Get forecast based directives of audio file sequences to generate voice calls
// @access   Public
router.get("/ivr-codes-v240317", callbackCodesV240317);

// @route    GET /api/mungbean/ivr-provider-v240317
// @desc     Get forecast based directives of audio file sequences to generate voice calls
// @access   Public
router.get("/ivr-provider-v240317", callbackV240317);

// @route    GET /api/mungbean/ivr-developer-v240317
// @desc     Get forecast based directives of audio file sequences to generate voice calls
// @access   Public
router.get("/ivr-developer-v240317", callbackV240317);

// @route    GET /api/mungbean/ivr-provider-v240317
// @desc     Get forecast based directives of audio file sequences to generate voice calls
// @access   Public
router.get("/ivr-provider-euglena-v240317", callbackV240317);

// @route    GET /api/mungbean/ivr-developer-v240317
// @desc     Get forecast based directives of audio file sequences to generate voice calls
// @access   Public
router.get("/ivr-developer-euglena-v240317", callbackV240317);

// @route    GET /api/mungbean/ivr-year-:y
// @desc     Get forecasts records for a given year
// @access   Public
router.get("/ivr-year-:y", callbackYear);

module.exports = router;

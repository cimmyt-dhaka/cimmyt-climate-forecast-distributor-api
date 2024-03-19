const { timeFormat } = require("d3-time-format");

module.exports = ({ isEuglenaURL, isIncoming, g, l, characterCodes, dates }) => {
  let directives = [];

  if (isIncoming) {
    directives.push(
      `ivr1_intro_${ g }_incoming_Y24`,
      `ivr1_intro2_bmd_forecast_incoming`
    );
  } else {
    directives.push(`ivr1_intro_${ g }_${ l }_${ isEuglenaURL ? 'ge' : 'dae' }`);
  }

  directives.push(
    isIncoming ? `ivr_${ l }_incoming` : `ivr_${ l }_bmd`,
    `ivr_db`,
    `ivr_d${ timeFormat("%m%d")(dates[0]) }`,
    `ivr_${ characterCodes[0] === characterCodes[1] ? "and" : `f_${ characterCodes }1` }`,
    `ivr_dc`,
    `ivr_d${ timeFormat("%m%d")(dates[1]) }`,
    `ivr_f_${ characterCodes }${ characterCodes[0] === characterCodes[1] ? "1" : "2" }${ characterCodes[2] !== "n" ? "_3d" : "" }`
  );

  if (characterCodes.indexOf("h") > -1 || characterCodes.indexOf("v") > -1) {
    directives.push(`msg4_adv_a_${ characterCodes }`);
    if (g === "gf") directives.push(`msg5_adv_b`);
  }

  directives.push(isEuglenaURL ? 'msg6_outro_y24_grameen' : 'msg6_outro_y24');
  directives.push(isEuglenaURL ? 'msg7_outro' : isIncoming ? 'ivr123_thanks' : 'msg7_outro');

  return directives;
};

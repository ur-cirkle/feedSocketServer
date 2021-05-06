const momenttz = require("moment-timezone");
const moment = require("moment");
const timeCalc = (timestamp, timezone) => {
  const date = `${momenttz.tz(timestamp, timezone).format("L")} ${moment
    .tz(timestamp, timezone)
    .format("LTS")}`;
  const start_date = moment(timestamp, "YYYY-MM-DD HH:mm:ss");
  const end_date = moment().tz(timezone);
  const duration = moment.duration(end_date.diff(start_date));
  const weeks = duration.asWeeks().toFixed();
  const days = duration.asDays().toFixed();
  const hours = duration.asHours().toFixed();
  const minutes = duration.asMinutes().toFixed();
  const seconds = duration.asSeconds().toFixed();
  // momenttz.tz(timestamp, timezone).format(`lll`)
  if (weeks > 3) return momenttz.tz(timestamp, timezone).format(`lll`);
  if (weeks > 0) return `${weeks} weeks ago`;
  if (days > 0) return `${days} days ago`;
  if (hours > 0) return `${hours} hours ago`;
  if (minutes > 0) return `${minutes} minutes ago`;
  if (seconds > 0) return `${seconds} seconds ago`;
  else {
    return "Just now";
  }

  return days;
};
module.exports = timeCalc;

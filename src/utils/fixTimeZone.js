const { utcToZonedTime } = require('date-fns-tz');

export default function fixTimeZone(date, timeZone) {
   const zonedDate = utcToZonedTime(date, timeZone);
   return zonedDate;
}

function isNotDate(date) {
  return isNaN(date.getTime());
}

function convertDate(date) {
  return {
    unix: date.getTime(),
    utc: date.toUTCString(),
  };
}

module.exports = { isNotDate, convertDate };

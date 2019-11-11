export const parse = str => {
  const arr = str.substr(1, str.length - 2).split(","); // Get rid of leading and trailing angle brackets
  const header = parseHeader(arr[0]);

  // Parse body
  let body = arr.slice(1, arr.length);

  console.log(body);

  switch (header.actionType) {
    case "UD":
      body = parseUpdateBody(body);
      break;
    default:
      body = { error: "Action type unsupported" };
      break;
  }

  // Fonction de retour
  return {
    ...header,
    ...body
  };
};

// Header format: vendor*id*length*action
export const parseHeader = header => {
  const arr = header.split("*");

  return {
    vendor: arr[0],
    id: arr[1],
    length: parseInt(arr[2]),
    actionType: arr[3]
  };
};

// Date format: ddmmyy
// Time format: hhmmss
const _parseDateTime = (date, time) =>
  new Date(
    parseInt(date.substr(4, 2)) + 2000, // 14 -> 2014
    parseInt(date.substr(2, 2)) - 1, // Zero-based
    parseInt(date.substr(0, 2)),
    parseInt(time.substr(0, 2)),
    parseInt(time.substr(2, 2)),
    parseInt(time.substr(4, 2))
  );

// Body format: date, time, local, latitude, latitudeSymbol, longitude, longitudeSymbol, ...
export const parseUpdateBody = body => {
  const arr = body.slice(0, 7); // We only need the location data

  const date = _parseDateTime(arr[0], arr[1]);
  const latitude = parseFloat(arr[3]);
  const longitude = parseFloat(arr[5]);

  return {
    date,
    latitude,
    longitude
  };
};

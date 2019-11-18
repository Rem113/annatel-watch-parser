export default str => {
  // Parse header
  const arr = str.substr(1, str.length - 2).split(","); // Get rid of leading and trailing angle brackets
  const header = parseHeader(arr[0]);

  // Parse body
  let body = arr.slice(1, arr.length);
  let payload = {};

  switch (header.actionType) {
    // **** 1. TERMINAL COMMANDS ***** //
    case "LK":
      payload = parseLK(body);
      break;
    case "UD":
      payload = parseUD(body);
      break;
    case "UD2":
      payload = parseUD2(body);
      break;
    case "AL":
      payload = parseAL(body);
      break;
    case "UPLOAD":
      payload = parseUPLOAD(body);
      break;
    case "MONITOR":
      payload = {}; // Any body to parse
      break;
    case "WAD":
      payload = parseWAD(body);
      break;
    case "WG":
      payload = parseWG(body);
      break;
    default:
      payload = { error: "Action type unsupported" };
      break;
  }

  // Return function
  return {
    ...header,
    payload
  };
};

// Header format: vendor*id*length*action
const parseHeader = header => {
  const arr = header.split("*");

  return {
    vendor: arr[0],
    watchId: arr[1],
    length: parseInt(arr[2], 16),
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

const parseLK = body => {
  if (body.length === 0) return {};
  else {
    const steps = parseInt(body[0]);
    const rollingTime = parseInt(body[1]);
    const batteryAmount = parseInt(body[2]);

    return {
      steps,
      rollingTime,
      batteryAmount
    };
  }
};

// Body format: date, time, local, latitude, latitudeSymbol, longitude, longitudeSymbol, ...
const parseLocationData = body => {
  const arr = body.slice(0, 7); // We only need the location data

  const date = _parseDateTime(arr[0], arr[1]);
  // const local = arr[2]; // Local or Not Local Time

  const latitude = parseFloat(arr[3]) * (arr[4] == "N" ? 1 : -1);
  const longitude = parseFloat(arr[5]) * (arr[6] == "E" ? 1 : -1);

  return {
    date,
    latitude,
    longitude
  };
};

const parseUD = body => parseLocationData(body);

const parseUD2 = body => parseLocationData(body);

const parseAL = body => parseLocationData(body);

const parseUPLOAD = body => {
  const interval = parseInt(body[0]);
  return {
    interval
  };
};

const parseWAD = body => {
  const language = body[0];
  const locationData = parseLocationData(body.slice(1, body.length));

  return {
    language,
    ...locationData
  };
};

const parseWG = body => {
  const locationData = parseLocationData(body);

  return {
    ...locationData
  };
};

// **** 2. SEND COMMANDS ON PLATFORM ***** //

const parseCENTER = body => {
  return {
    centerNumber: body[0]
  };
};

const parseSLAVE = body => {
  return {
    assistanceNumber: body[0]
  };
};

const parsePW = body => {
  return {
    password: body[0]
  };
};

const parseCALL = body => {
  return {
    phoneNumber: body[0]
  };
};

const parseSMS = body => {
  return {
    phoneNumber: body[0],
    message: body[1]
  };
};

const parseUPGRADE = body => {
  return {
    URL: body[0]
  };
};

const parseIP = body => {
  return {
    IP: body[0],
    port: parseInt(body[1])
  };
};

const parseLZ = body => {
  return {
    language: body[0],
    timeArea: body[1]
  };
};
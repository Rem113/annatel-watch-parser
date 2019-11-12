export const parse = str => {
  // Parse header
  const arr = str.substr(1, str.length - 2).split(","); // Get rid of leading and trailing angle brackets
  const header = parseHeader(arr[0]);

  // Parse body
  let body = arr.slice(1, arr.length);

  switch (header.actionType) {
    // **** 1. TERMINAL COMMANDS ***** //
    case "LK":
      body = parseLK(body);
      break;
    case "UD":
      body = parseUD(body);
      break;
    case "UD2":
      body = parseUD2(body);
      break;
    case "AL":
      body = parseAL(body);
      break;
    case "UPLOAD":
      body = parseUPLOAD(body);
      break;
    case "MONITOR":
      body = {}; // Any body to parse
      break;
    case "WAD":
      body = parseWAD(body);
      break;
    case "WG":
      body = parseWG(body);
      break;
    // **** 2. SEND COMMANDS ON PLATFORM ***** //
    case "CENTER":
      body = parseCENTER(body);
      break;
    case "SLAVE":
      body = parseSLAVE(body);
      break;
    case "PW":
      body = parsePW(body);
      break;
    case "CALL":
      body = parseCALL(body);
      break;
    case "SMS":
      body = parseSMS(body);
      break;
    case "*****************":
      body = parseWG(body);
      break;
    case "UPGRADE":
      body = parseUPGRADE(body);
      break;
    case "IP":
      body = parseIP(body);
      break;
    case "FACTORY":
      body = {}; // Any body to parse
      break;
    case "LZ":
      body = parseLZ(body);
      break;
    case "*****************":
      body = parseWG(body);
      break;
    case "*****************":
      body = parseWG(body);
      break;
    case "*****************":
      body = parseWG(body);
      break;
    case "*****************":
      body = parseWG(body);
      break;
    case "*****************":
      body = parseWG(body);
      break;
    case "*****************":
      body = parseWG(body);
      break;
    case "*****************":
      body = parseWG(body);
      break;
    case "*****************":
      body = parseWG(body);
      break;

    default:
      body = { error: "Action type unsupported" };
      break;
  }

  // Return function
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

export const parseLK = body => {
  console.log(body.length);
  if (body.length === 0) return;
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
export const parseLocationData = body => {
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

export const parseUD = body => parseLocationData(body);

export const parseUD2 = body => parseLocationData(body);

export const parseAL = body => parseLocationData(body);

export const parseUPLOAD = body => {
  const interval = parseInt(body[0]);
  return {
    interval
  };
};

export const parseWAD = body => {
  const language = body[0];
  const locationData = parseLocationData(body.slice(1, body.length));

  return {
    language,
    ...locationData
  };
};

export const parseWG = body => {
  const locationData = parseLocationData(body.slice(1, body.length));

  return {
    ...locationData
  };
};

// **** 2. SEND COMMANDS ON PLATFORM ***** //

export const parseCENTER = body => {
  return {
    centerNumber: body[0]
  };
};

export const parseSLAVE = body => {
  return {
    assistanceNumber: body[0]
  };
};

export const parsePW = body => {
  return {
    password: body[0]
  };
};

export const parseCALL = body => {
  return {
    phoneNumber: body[0]
  };
};

export const parseSMS = body => {
  return {
    phoneNumber: body[0],
    message: body[1]
  };
};

export const parseUPGRADE = body => {
  return {
    URL: body[0]
  };
};

export const parseIP = body => {
  return {
    IP: body[0],
    port: parseInt(body[1])
  };
};

export const parseLZ = body => {
  return {
    language: body[0],
    timeArea: body[1]
  };
};

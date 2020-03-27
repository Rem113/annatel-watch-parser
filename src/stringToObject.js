export default str => {
  // Parse header
  const arr = str.substr(1, str.length - 2).split(","); // Get rid of leading and trailing angle brackets
  const header = parseHeader(arr[0]);

  // Parse body
  let body = arr.slice(1, arr.length);
  let payload = {};

  if (body) {
    switch (header.actionType) {
      // **** 1. TERMINAL SENDS COMMANDS ***** //
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

      case "CENTER":
        payload = parseCENTER(body);
        break;
      case "SLAVE":
        payload = parseSLAVE(body);
        break;
      case "PW":
        payload = parsePW(body);
        break;
      case "CALL":
        payload = parseCALL(body);
        break;
      case "SMS":
        payload = parseSMS(body);
        break;
      case "UPGRADE":
        payload = parseUPGRADE(body);
        break;
      case "IP":
        payload = parseIP(body);
        break;
      case "FACTORY":
        payload = {}; // Nothing to parse
        break;
      case "LZ":
        payload = parseLZ(body);
        break;
      case "URL":
        payload = parseURL(body);
        break;
      case "SOSSMS":
        payload = parseSOSSMS(body);
        break;
      case "LOWBAT": // *** 15 ***
        payload = parseLOWBAT(body);
        break;
      case "APN":
        payload = parseAPN(body);
        break;
      case "ANY":
        payload = parseANY(body);
        break;
      case "TS":
        payload = parseTS(body);
        break;
      case "VERNO":
        payload = {}; // Nothing to parse
        break;
      case "RESET":
        payload = {}; // Nothing to parse
        break;
      case "CR":
        payload = {}; // Nothing to parse
        break;
      case "BT":
        payload = parseBT(body);
        break;
      case "WORK":
        payload = parseWORK(body);
        break;
      case "WORKTIME":
        payload = parseWORKTIME(body);
        break;
      case "REMOVE":
        payload = parseREMOVE(body);
        break;
      case "PULSE":
        payload = parsePULSE(body);
        break;

      default:
        payload = { error: "Action type unsupported" };
        break;
    }
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
  const arr = body; //.slice(0, 7); // We only need the location data

  const date = _parseDateTime(arr[0], arr[1]);
  const local = arr[2] === "A"; // Local or Not Local Time

  const latitude = parseFloat(arr[3]) * (arr[4] == "N" ? 1 : -1);
  const longitude = parseFloat(arr[5]) * (arr[6] == "E" ? 1 : -1);

  const speed = parseFloat(arr[7]);
  const direction = parseFloat(arr[8]);
  const altitude = parseFloat(arr[9]);

  const numberOfSatellites = parseInt(arr[10]);
  const GSMStrength = parseInt(arr[11]);
  const battery = parseInt(arr[12]);
  const pedometer = parseInt(arr[13]);
  const rollingTime = parseInt(arr[14]);
  const terminalState = arr[15];
  const baseStationsNumber = parseInt(arr[16]);
  const connectedToStation = parseInt(arr[17]);
  const MCCCountryCode = parseInt(arr[18]);
  const MNCNetworkCode = parseInt(arr[19]);

  const baseStationAreaCode = parseInt(arr[20]);
  const baseStationNumber = parseInt(arr[21]);
  const baseStationSignalStrength = parseInt(arr[22]);

  const baseStation1AreaCode = parseInt(arr[23]);
  const baseStation1Number = parseInt(arr[24]);
  const baseStation1SignalStrength = parseInt(arr[25]);

  const baseStation2AreaCode = parseInt(arr[26]);
  const baseStation2Number = parseInt(arr[27]);
  const baseStation2SignalStrength = parseInt(arr[28]);

  const baseStation3AreaCode = parseInt(arr[29]);
  const baseStation3Number = parseInt(arr[30]);
  const baseStation3SignalStrength = parseInt(arr[31]);

  return {
    date,
    local,
    latitude,
    longitude,

    speed,
    direction,
    altitude,

    numberOfSatellites,
    GSMStrength,
    battery,
    pedometer,
    rollingTime,
    terminalState,
    baseStationsNumber,
    connectedToStation,
    MCCCountryCode,
    MNCNetworkCode,

    baseStationAreaCode,
    baseStationNumber,
    baseStationSignalStrength,

    baseStation1AreaCode,
    baseStation1Number,
    baseStation1SignalStrength,

    baseStation2AreaCode,
    baseStation2Number,
    baseStation2SignalStrength,

    baseStation3AreaCode,
    baseStation3Number,
    baseStation3SignalStrength
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

// MONITOR: Nothing to parse

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

// const parseSOS

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

const parseURL = body => {
  return {
    // URL Google Query
  };
};

const parseSOSSMS = body => {
  return {
    sendEmergencySMS: body[0]
  };
};

const parseLOWBAT = body => {
  return {
    sendBatteryLowSMS: body[0]
  };
};

const parseAPN = body => {
  return {
    APNName: body[0],
    userName: body[1],
    code: body[2],
    userData: body[3]
  };
};

const parseANY = body => {
  return {
    SMSControlAccess: body[0]
  };
};

const parseTS = body => {
  return {
    // Parameter Query
  };
};

const parseBT = body => {
  return {
    bluetoothOn: body[0]
  };
};

const parseWORK = body => {
  return {
    workingTimeArea: body
  };
};

const parseWORKTIME = body => {
  return {
    workingTime: body[0]
  };
};

const parseREMOVE = body => {
  return {
    alarmOn: body[0]
  };
};

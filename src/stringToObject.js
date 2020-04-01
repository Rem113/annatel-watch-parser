export default str => {
  // Parse header
  const arr = str.substr(1, str.length - 2).split(","); // Get rid of leading and trailing angle brackets
  const header = _parseHeader(arr[0]);

  // Parse body
  let body = arr.slice(1, arr.length);
  let payload = {};

  switch (header.actionType) {
    case "LK":
      payload = _parseLK(body);
      break;
    case "UD":
      payload = _parseUD(body);
      break;
    case "UD2":
      payload = _parseUD2(body);
      break;
    case "AL":
      payload = _parseAL(body);
      break;
    case "WAD":
      payload = _parseWAD(body);
      break;
    case "WG":
      payload = _parseWG(body);
      break;
    case "URL":
      payload = _parseURL(body);
      break;
    case "TS":
      payload = _parseTS(body);
      break;
    case "VERNO":
      payload = _parseVERNO(body);
      break;
    case "PULSE":
      payload = _parsePULSE(body);
      break;
    case "ANY":
    case "APN":
    case "BT":
    case "CALL":
    case "CENTER":
    case "CR":
    case "FACTORY":
    case "LOWBAT":
    case "LZ":
    case "MONITOR":
    case "POWEROFF":
    case "PW":
    case "REMOVE":
    case "RESET":
    case "SLAVE":
    case "SMS":
    case "SOS":
    case "SOSSMS":
    case "SOS1":
    case "SOS2":
    case "SOS3":
    case "UPGRADE":
    case "UPLOAD":
    case "WORK":
    case "WORKTIME":
      payload = {};
      break;
    default:
      payload = { error: "Action type unsupported" };
      break;
  }

  return {
    ...header,
    payload
  };
};

// Header format: vendor*id*length*action
const _parseHeader = header => {
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

// Body format: date, time, local, latitude, latitudeSymbol, longitude, longitudeSymbol, ...
const _parseLocationData = body => {
  const date = _parseDateTime(body[0], body[1]);
  const local = body[2] === "A"; // Local or Not Local Time

  const latitude = parseFloat(body[3]) * (body[4] == "N" ? 1 : -1);
  const longitude = parseFloat(body[5]) * (body[6] == "E" ? 1 : -1);

  const speed = parseFloat(body[7]);
  const direction = parseFloat(body[8]);
  const altitude = parseFloat(body[9]);

  const numberOfSatellites = parseInt(body[10]);
  const GSMStrength = parseInt(body[11]);
  const battery = parseInt(body[12]);
  const pedometer = parseInt(body[13]);
  const rollingTime = parseInt(body[14]);
  const terminalState = body[15];
  const baseStationsNumber = parseInt(body[16]);
  const connectedToStation = parseInt(body[17]);
  const MCCCountryCode = parseInt(body[18]);
  const MNCNetworkCode = parseInt(body[19]);

  let baseStationData = {};

  if (body.length > 20) baseStationData = _parseBaseStationData(body);

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

    ...baseStationData
  };
};

const _parseBaseStationData = body => ({
  baseStationAreaCode: parseInt(body[20]),
  baseStationNumber: parseInt(body[21]),
  baseStationSignalStrength: parseInt(body[22]),

  baseStation1AreaCode: parseInt(body[23]),
  baseStation1Number: parseInt(body[24]),
  baseStation1SignalStrength: parseInt(body[25]),

  baseStation2AreaCode: parseInt(body[26]),
  baseStation2Number: parseInt(body[27]),
  baseStation2SignalStrength: parseInt(body[28]),

  baseStation3AreaCode: parseInt(body[29]),
  baseStation3Number: parseInt(body[30]),
  baseStation3SignalStrength: parseInt(body[31])
});

const _parseLK = body => {
  if (body.length === 0) return {};

  const steps = parseInt(body[0]);
  const rollingTime = parseInt(body[1]);
  const batteryAmount = parseInt(body[2]);

  return {
    steps,
    rollingTime,
    batteryAmount
  };
};

const _parseUD = body => _parseLocationData(body);
const _parseAL = body => _parseLocationData(body);
const _parseUD2 = body => _parseLocationData(body);
const _parseWG = body => _parseLocationData(body);

const _parseWAD = body => ({
  language: body[0],
  ..._parseLocationData(body.slice(1, body.length))
});

const _parseURL = body => ({
  url: body[0]
});

const _parseTS = body => ({
  softwareDevice: body[0],
  IDDevice: body[1],
  IMEI: body[2],
  IP: body[3],
  port: body[4],
  centerNumber: body[5],
  assistanceNumber: body[6],
  SOS1: body[7],
  SOS2: body[8],
  SOS3: body[9],
  reportingIntervals: body[10],
  batteryAmount: body[11],
  language: body[12],
  timeArea: body[13],
  satelliteNumber: body[14],
  GSMSignalStrength: body[15],
  LED: body[16],
  switch: body[17],
  code: body[18]
});

const _parseVERNO = body => ({
  versionNumber: body[0]
});

const _parsePULSE = body => ({ pulseBeatingNumber: parseInt(body[0]) });

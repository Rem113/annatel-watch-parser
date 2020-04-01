export default obj => {
  const header = parseHeader(obj);

  const body = obj.payload;
  let payload;

  if (body) {
    switch (obj.actionType) {
      // *** 1. Terminal Commands ***
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
      case "WAD":
        payload = parseWAD(body);
        break;
      case "WG":
        payload = parseWG(body);
        break;

      // *** 2. Server Commands ***
      case "UPLOAD":
        payload = parseUPLOAD(body);
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
      case "MONITOR":
        // Nothing to parse
        break;
      case "SOS":
      case "SOS1":
      case "SOS2":
      case "SOS3":
        payload = parseSOS(body, header.actionType);
        break;

      case "UPGRADE":
        payload = parseUPGRADE(body);
        break;
      case "IP":
        payload = parseIP(body);
        break;
      case "FACTORY":
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
      case "LOWBAT":
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
      case "RESET":
      case "CR":
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

  calculateLenght(header, payload);

  return `[${header}` + (payload ? `,${payload}]` : "]");
};

const calculateLenght = (header, payload) => {
  header.length = (
    header.actionType.length + (payload.length ? payload.length + 1 : 0)
  )
    .toString(16)
    .toUpperCase()
    .padStart(4, "0");
};

const parseHeader = obj => {
  return `${obj.vendor}*${obj.watchId}*${obj.length}*${obj.actionType}`;
};

const parseLocationData = body => {
  let dateTime = body.date;

  let tabDate = [
    dateTime.getDate(),
    dateTime.getMonth() + 1,
    dateTime.getYear() % 100
  ];
  let tabTime = [
    dateTime.getHours(),
    dateTime.getMinutes(),
    dateTime.getSeconds()
  ];
  let date = "",
    time = "";

  tabDate.forEach(element => {
    date += element.toString().padStart(2, "0");
  });

  tabTime.forEach(element => {
    time += element.toString().padStart(2, "0");
  });

  dateTime = `${date},${time}`;

  let latitude = body.latitude;
  latitude = `${latitude},` + (latitude > 0 ? "N" : "S");
  let longitude = body.longitude;
  longitude = `${longitude},` + (longitude > 0 ? "E" : "W");

  return `${dateTime},${latitude},${longitude}`;
};

const parseLK = body => {
  return `${steps},${rollingTime},${batteryAmount}`;
};

const parseUD = body => parseLocationData(body);
const parseUD2 = body => parseLocationData(body);
const parseAL = body => parseLocationData(body);

const parseWAD = body => {
  return `${body.language},` + parseLocationData(body);
};

const parseWG = body => parseLocationData(body);

// *** 2. Server Commands *** //

const parseUPLOAD = body => {
  return `${body.interval}`;
};

const parseCENTER = body => {
  return `${body.centerNumber}`;
};

const parseSLAVE = body => {
  return `${body.assistanceNumber}`;
};

const parsePW = body => {
  return `${body.password}`;
};

const parseCALL = body => {
  return `${body.phoneNumber}`;
};

const parseSMS = body => {
  return `${body.phoneNumber},${message}`;
};

const parseSOS = (body, SOSNumber) => {
  let id = parseInt(SOSNumber[SOSNumber.length - 1]);
  let p = "phoneNumber";

  if (!isNaN(id)) return `${body[p + id]}`;
  else {
    let result = "";
    for (var i = 1; i < 4; ++i) result += `${body[p + i]},`;
    result = result.slice(0, -1);
    return result;
  }
};

const parseUPGRADE = body => {
  return `${body.URL}`;
};

const parseIP = body => {
  return `${body.IP},${port}`;
};

const parseLZ = body => {
  return `${body.language},${body.timeArea}`;
};

const parseURL = body => {
  return `${url}`;
};

const parseSOSSMS = body => {
  return `${body.sendEmergencySMS}`;
};

const parseLOWBAT = body => {
  return `${body.sendBatteryLowSMSOn}`;
};

const parseAPN = body => {
  return `${body.APNName},${body.userName},${body.code},${body.userData}`;
};

const parseANY = body => {
  return `${body.SMSControlAccessOn}`;
};

const parseTS = body => {
  return `${body.softwareDevice},
    ${body.IDDevice},
    ${body.IMEI},
    ${body.IP},
    ${body.port},
    ${body.centerNumber},
    ${body.assistanceNumber},
    ${body.SOS1},
    ${body.SOS2},
    ${body.SOS3},
    ${body.reportingIntervals},
    ${body.batteryAmount},
    ${body.language},
    ${body.timeArea},
    ${body.satelliteNumber},
    ${body.GSMSignalStrength},
    ${body.LED},
    ${body.switch},
    ${body.code}`;
};

const parseBT = body => {
  return `${body.bluetoothOn}`;
};

const parseWORK = body => {
  return `${body.workingTimeArea}`;
};

const parseWORKTIME = body => {
  return `${body.workingTime}`;
};

const parseREMOVE = body => {
  return `${body.alarmOn}`;
};

const parsePULSE = body => {
  return `${body.pulseBeatingNumber}`;
};

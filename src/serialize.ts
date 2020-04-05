export default (obj) => {
  const body = obj.payload;

  let payload: string | null;

  switch (obj.actionType) {
    case "AL":
    case "CR":
    case "FACTORY":
    case "LK":
    case "MONITOR":
    case "POWEROFF":
    case "PULSE":
    case "RESET":
    case "TS":
    case "URL":
    case "VERNO":
      payload = null;
      break;
    case "ANY":
      payload = _parseANY(body);
      break;
    case "APN":
      payload = _parseAPN(body);
      break;
    case "LOWBAT":
      payload = _parseLOWBAT(body);
      break;
    case "SOSSMS":
      payload = _parseSOSSMS(body);
      break;
    case "LZ":
      payload = _parseLZ(body);
      break;
    case "IP":
      payload = _parseIP(body);
      break;
    case "UPGRADE":
      payload = _parseUPGRADE(body);
      break;
    case "SOS":
      payload = _parseSOS(body);
      break;
    case "SOS1":
    case "SOS2":
    case "SOS3":
      payload = _parseSOSNumbered(body);
      break;
    case "SMS":
      payload = _parseSMS(body);
      break;
    case "CALL":
      payload = _parseCALL(body);
      break;
    case "UPLOAD":
      payload = _parseUPLOAD(body);
      break;
    case "CENTER":
      payload = _parseCENTER(body);
      break;
    case "SLAVE":
      payload = _parseSLAVE(body);
      break;
    case "PW":
      payload = _parsePW(body);
      break;
    case "WAD":
      payload = _parseWAD(body);
      obj.actionType = "RAD";
      break;
    case "WG":
      payload = _parseWG(body);
      obj.actionType = "RG";
      break;
    case "BT":
      payload = _parseBT(body);
      break;
    case "WORK":
      payload = _parseWORK(body);
      break;
    case "WORKTIME":
      payload = _parseWORKTIME(body);
      break;
    case "REMOVE":
      payload = _parseREMOVE(body);
      break;
    default:
      throw "Action not supported";
  }

  obj.length = _calculateLength(obj.actionType, payload);

  const header = _parseHeader(obj);

  return `[${header}` + (payload ? `,${payload}]` : "]");
};

const _calculateLength = (actionType: string, payload: string | null) => {
  if (payload !== null) return actionType.length + payload.length + 1;
  return actionType.length;
};

const _parseHeader = (obj) => {
  const length = obj.length.toString(16).toUpperCase().padStart(4, "0");

  return `${obj.vendor}*${obj.watchId}*${length}*${obj.actionType}`;
};

const _parseDateTime = (body) => {
  let dateTime = body.date;

  let tabDate = [
    dateTime.getDate(),
    dateTime.getMonth() + 1,
    dateTime.getYear() % 100,
  ];
  let tabTime = [
    dateTime.getHours(),
    dateTime.getMinutes(),
    dateTime.getSeconds(),
  ];

  const date = tabDate.map((e) => e.toString().padStart(2, "0")).join("");
  const time = tabTime.map((e) => e.toString().padStart(2, "0")).join("");

  let local = "";
  if (body.local) local = ",A";

  dateTime = `${date},${time + local}`;
};

const _parseLocationData = (body) => {
  let latitude = body.latitude;
  latitude = `${latitude},` + (latitude > 0 ? "N" : "S");
  let longitude = body.longitude;
  longitude = `${longitude},` + (longitude > 0 ? "E" : "W");

  return `${latitude},${longitude}`;
};

const _parseWAD = (body) =>
  `${body.language},${_parseDateTime(body)},${_parseLocationData(body)}`;
const _parseWG = (body) => _parseLocationData(body);
const _parseUPLOAD = (body) => `${body.interval}`;
const _parseCENTER = (body) => `${body.centerNumber}`;
const _parseSLAVE = (body) => `${body.assistanceNumber}`;
const _parsePW = (body) => `${body.password}`;
const _parseCALL = (body) => `${body.phoneNumber}`;
const _parseSMS = (body) => `${body.phoneNumber},${body.message}`;
const _parseSOSNumbered = (body) => `${body.phoneNumber}`;
const _parseSOS = (body) =>
  `${body.smsNumberOne},${body.smsNumberTwo},${body.smsNumberThree}`;
const _parseUPGRADE = (body) => `${body.url}`;
const _parseIP = (body) => `${body.ip},${body.port}`;
const _parseLZ = (body) => `${body.language},${body.timeArea}`;
const _parseSOSSMS = (body) => `${body.sendSmsWhenSos}`;
const _parseLOWBAT = (body) => `${body.sendSmsLowBattery}`;
const _parseAPN = (body) =>
  `${body.apnName},${body.username},${body.code},${body.userData}`;
const _parseANY = (body) => `${body.smsControlAccess}`;
const _parseBT = (body) => `${body.bluetooth}`;
const _parseWORK = (body) =>
  body.work.map((e) => `${e.start}-${e.end}`).join(",");
const _parseWORKTIME = (body) => `${body.workingTime}`;
const _parseREMOVE = (body) => `${body.removeAlarm}`;

export default obj => {
  //function a(obj) {
  const header = parseHeader(obj);

  const body = obj.payload;
  let payload;

  if (body) {
    switch (obj.actionType) {
      case "LK":
        // Nothing to parse
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
        break;
      case "LZ":
        payload = parseLZ(body);
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
        // Nothing to parse
        break;
      case "WAD":
        payload = parseWAD(body);
        break;
      case "WG":
        payload = parseWG(body);
        break;
    }
  }

  return `[${header}` + (payload ? `,${payload}]` : "]");
};

const parseHeader = obj => {
  return `${obj.vendor}*${obj.watchId}*${obj.length
    .toString(16)
    .toUpperCase()
    .padStart(4, "0")}*${obj.actionType}`;
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
    //console.log(element);
    date += element.toString().padStart(2, "0");
  });

  tabTime.forEach(element => {
    //console.log(element);
    time += element.toString().padStart(2, "0");
  });

  dateTime = `${date},${time}`;

  let latitude = body.latitude;
  latitude = `${latitude},` + (latitude > 0 ? "N" : "S");
  let longitude = body.longitude;
  longitude = `${longitude},` + (longitude > 0 ? "E" : "W");

  return `${dateTime},${latitude},${longitude}`;
};

const parseUD = body => parseLocationData(body);
const parseUD2 = body => parseLocationData(body);
const parseAL = body => parseLocationData(body);
const parseWG = body => parseLocationData(body);

const parseUPLOAD = body => {
  return `${body.interval}`;
};

const parseWAD = body => {
  return `${body.language},` + parseLocationData(body);
};

// **** 2. SEND COMMANDS ON PLATFORM ***** //

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

const parseUPGRADE = body => {
  return `${body.URL}`;
};

const parseIP = body => {
  return `${body.IP},${port}`;
};

const parseLZ = body => {
  return `${body.language},${timeArea}`;
};

// const expectedWG = {
//   vendor: "SG",
//   watchId: "8800000015",
//   length: parseInt("87", 16),
//   actionType: "WG",
//   payload: {
//     date: new Date("04/22/2014 13:46:52"), // mm/dd/yyyy hh:mm:ss
//     latitude: 22.571707,
//     longitude: 113.8613968
//   }
// };

// const packetWG =
//   "[SG*8800000015*0087*WG,220414,134652,A,22.571707,N,113.8613968,E,0.1,0.0,100,7,60,90,1000,50,0001,4,1,460,0,9360,4082,131,9360,4092,148,9360,4091,143,9360,4153,141]";

// console.log(packetWG);
// console.log(a(expectedWG));

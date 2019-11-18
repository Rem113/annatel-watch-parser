export default obj => {
  const header = parseHeader(obj);

  const body = "";

  switch (obj.actionType) {
    // **** 2. SEND COMMANDS ON PLATFORM ***** //
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
      // Nothing to parse
      break;
    case "LZ":
      payload = parseLZ(body);
      break;
  }
};

const parseHeader = obj => {
  return `${obj.vendor}*${obj.id}*${parseInt(obj.length)}*${obj.actionType}`;
};

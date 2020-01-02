import { stringToObject, objectToString } from "../index";

const packetLK = "[SG*8800000015*0002*LK]";
const packetLKE = "[SG*8800000015*000D*LK,50,100,100]";
const packetUD =
  "[SG*5305994463*0178*UD,011119,103406,V,31.766222,N,35.190035,E,0.00,0.0,0.0,4,95,24,0,205,00000000,7,255,425,1,10472,10013,142,10471,10611,135,10472,10053,134,10471,10612,130,10471,10102,130,10471,10563,129,10472,11413,129,5,JCT-Lev-WiFi,b4:5d:50:bd:8c:e0,-80,JCT-Lev-WiFi,b4:5d:50:bd:99:80,-83,Home2,18:d6:c7:ef:1e:a7,-86,TP-LINK_AKA,3c:46:d8:c6:9a:f4,-90,JCT-Lev-WiFi,b4:5d:50:bd:c1:c0,-91,27.7]";
const packetUD2 =
  "[SG*8800000015*0088*UD2,220414,134652,A,22.571707,N,113.8613968,E,0.1,0.0,100,7,60,90,1000,50,0000,4,1,460,0,9360,4082,131,9360,4092,148,9360,4091,143,9360,4153,141]";
const packetAL =
  "[SG*8800000015*0087*AL,220414,134652,A,22.571707,N,113.8613968,E,0.1,0.0,100,7,60,90,1000,50,0001,4,1,460,0,9360,4082,131,9360,4092,148,9360,4091,143,9360,4153,141]";
const packetUPLOAD = "[SG*8800000015*0009*UPLOAD,10]";
const packetMONITOR = "[SG*8800000015*0007*MONITOR]";
const packetWAD =
  "[SG*8800000015*008B*WAD,CH,220414,134652,A,22.571707,N,113.8613968,E,0.1,0.0,100,7,60,90,1000,50,0001,4,1,460,0,9360,4082,131,9360,4092,148,9360,4091,143,9360,4153,141]";
const packetWG =
  "[SG*8800000015*0087*WG,220414,134652,A,22.571707,N,113.8613968,E,0.1,0.0,100,7,60,90,1000,50,0001,4,1,460,0,9360,4082,131,9360,4092,148,9360,4091,143,9360,4153,141]";

describe("parse packets", () => {
  it("should parse update packets correctly", () => {
    const expectedLK = {
      vendor: "SG",
      watchId: "8800000015",
      length: parseInt("2", 16),
      actionType: "LK",
      payload: {}
    };

    const expectedLKE = {
      vendor: "SG",
      watchId: "8800000015",
      length: parseInt("000d", 16),
      actionType: "LK",
      payload: { steps: 50, rollingTime: 100, batteryAmount: 100 }
    };

    const packetUD =
      "[SG*5305994463*0178*UD,011119,103406,V,31.766222,N,35.190035,E,0.00,0.0,0.0,4,95,24,0,205,00000000,7,255,425,1,10472,10013,142,10471,10611,135,10472,10053,134,10471,10612,130,10471,10102,130,10471,10563,129,10472,11413,129,5,JCT-Lev-WiFi,b4:5d:50:bd:8c:e0,-80,JCT-Lev-WiFi,b4:5d:50:bd:99:80,-83,Home2,18:d6:c7:ef:1e:a7,-86,TP-LINK_AKA,3c:46:d8:c6:9a:f4,-90,JCT-Lev-WiFi,b4:5d:50:bd:c1:c0,-91,27.7]";

    const expectedUD = {
      vendor: "SG",
      watchId: "5305994463",
      length: parseInt("178", 16),
      actionType: "UD",
      payload: {
        date: new Date("11/01/2019 10:34:06"), // mm/dd/yyyy hh:mm:ss
        latitude: 31.766222,
        longitude: 35.190035,
        local: false,
        speed: 0.0,
        direction: 0.0,
        altitude: 0.0,

        numberOfSatellites: 4,
        GSMStrength: 95,
        battery: 24,
        pedometer: 0,
        rollingTime: 205,
        terminalState: "00000000",
        baseStationsNumber: 7,
        connectedToStation: 255,
        MCCCountryCode: 425,
        MNCNetworkCode: 1,

        baseStationAreaCode: 10472,
        baseStationNumber: 10013,
        baseStationSignalStrength: 142,

        baseStation1AreaCode: 10471,
        baseStation1Number: 10611,
        baseStation1SignalStrength: 135,

        baseStation2AreaCode: 10472,
        baseStation2Number: 10053,
        baseStation2SignalStrength: 134,

        baseStation3AreaCode: 10471,
        baseStation3Number: 10612,
        baseStation3SignalStrength: 130
      }
    };

    const expectedUD2 = {
      vendor: "SG",
      watchId: "8800000015",
      length: parseInt("88", 16),
      actionType: "UD2",
      payload: {
        date: new Date("04/22/2014 13:46:52"), // mm/dd/yyyy hh:mm:ss
        latitude: 22.571707,
        longitude: 113.8613968
      }
    };

    const expectedAL = {
      vendor: "SG",
      watchId: "8800000015",
      length: parseInt("87", 16),
      actionType: "AL",
      payload: {
        date: new Date("04/22/2014 13:46:52"), // mm/dd/yyyy hh:mm:ss
        latitude: 22.571707,
        longitude: 113.8613968
      }
    };

    const expectedUPLOAD = {
      vendor: "SG",
      watchId: "8800000015",
      length: parseInt("9", 16),
      actionType: "UPLOAD",
      payload: { interval: 10 }
    };

    const expectedMONITOR = {
      vendor: "SG",
      watchId: "8800000015",
      length: parseInt("7", 16),
      actionType: "MONITOR",
      payload: {}
    };

    const expectedWAD = {
      vendor: "SG",
      watchId: "8800000015",
      length: parseInt("8B", 16),
      actionType: "WAD",
      payload: {
        language: "CH",
        date: new Date("04/22/2014 13:46:52"), // mm/dd/yyyy hh:mm:ss
        latitude: 22.571707,
        longitude: 113.8613968
      }
    };

    const expectedWG = {
      vendor: "SG",
      watchId: "8800000015",
      length: parseInt("87", 16),
      actionType: "WG",
      payload: {
        date: new Date("04/22/2014 13:46:52"), // mm/dd/yyyy hh:mm:ss
        latitude: 22.571707,
        longitude: 113.8613968
      }
    };

    expect(stringToObject(packetLK)).toEqual(expectedLK);
    expect(stringToObject(packetLKE)).toEqual(expectedLKE);
    expect(stringToObject(packetUD)).toEqual(expectedUD);
    //expect(stringToObject(packetUD2)).toEqual(expectedUD2);
    //expect(stringToObject(packetAL)).toEqual(expectedAL);
    expect(stringToObject(packetUPLOAD)).toEqual(expectedUPLOAD);
    expect(stringToObject(packetMONITOR)).toEqual(expectedMONITOR);
    //expect(stringToObject(packetWAD)).toEqual(expectedWAD);
    //expect(stringToObject(packetWG)).toEqual(expectedWG);
  });
});

// **** 2. SEND COMMANDS ON PLATFORM ***** //
const packetCENTER = "[SG*8800000015*0012*CENTER,00000000000]";
const packetSLAVE = "[SG*8800000015*0011*SLAVE,00000000000]";
const packetPW = "[SG*8800000015*0009*PW,111111]";
const packetCALL = "[SG*8800000015*0010*CALL,00000000000]";
const packetSMS = "[SG*8800000015*001C*SMS,00000000000,123ABC How are you]";

const packetUPGRADE =
  "[SG*8800000015*0039*UPGRADE,http://www.3g-elec.com/g29_updata/test/jt_ads.bin]";
const packetIP = "[SG*8800000015*0014*IP,113.81.229.9,5900]";
const packetFACTORY = "[SG*8800000015*0007*FACTORY]";
const packetLZ = "[SG*8800000015*0006*LZ,1,8]";

// describe("parse packets: 2. SEND COMMANDS ON PLATFORM", () => {
//   it("should parse correction part 2 packets", () => {
//     const expectedCENTER = {
//       vendor: "SG",
//       id: "8800000015",
//       length: 12,
//       actionType: "CENTER",
//       centerNumber: "00000000000"
//     };

//     const expectedSLAVE = {
//       vendor: "SG",
//       id: "8800000015",
//       length: 11,
//       actionType: "SLAVE",
//       assistanceNumber: "00000000000"
//     };

//     const expectedPW = {
//       vendor: "SG",
//       id: "8800000015",
//       length: 9,
//       actionType: "PW",
//       password: "111111"
//     };

//     const expectedCALL = {
//       vendor: "SG",
//       id: "8800000015",
//       length: 10,
//       actionType: "CALL",
//       phoneNumber: "00000000000"
//     };

//     const expectedSMS = {
//       vendor: "SG",
//       id: "8800000015",
//       length: 28, // 1C
//       actionType: "SMS",
//       phoneNumber: "00000000000",
//       message: "123ABC How are you"
//     };

//     const expectedUPGRADE = {
//       vendor: "SG",
//       id: "8800000015",
//       length: 39, // 1C
//       actionType: "UPGRADE",
//       URL: "http://www.3g-elec.com/g29_updata/test/jt_ads.bin"
//     };

//     const expectedIP = {
//       vendor: "SG",
//       id: "8800000015",
//       length: 14, // 1C
//       actionType: "IP",
//       IP: "113.81.229.9",
//       port: 5900
//     };

//     const expectedFACTORY = {
//       vendor: "SG",
//       id: "8800000015",
//       length: 7, // 0007
//       actionType: "FACTORY"
//     };

//     const expectedLZ = {
//       vendor: "SG",
//       id: "8800000015",
//       language: "1",
//       timeArea: "8"
//     };

//     expect(parse(packetCENTER)).toEqual(expectedCENTER);
//     expect(parse(packetSLAVE)).toEqual(expectedSLAVE);
//     expect(parse(packetPW)).toEqual(expectedPW);
//     expect(parse(packetCALL)).toEqual(expectedCALL);
//     //expect(parse(packetSMS)).toEqual(expectedSMS);
//     expect(parse(packetUPGRADE)).toEqual(expectedUPGRADE);
//     expect(parse(packetIP)).toEqual(expectedIP);
//     expect(parse(packetFACTORY)).toEqual(expectedFACTORY);
//     expect(parse(packetLZ)).toEqual(expectedLZ);
//   });
// });

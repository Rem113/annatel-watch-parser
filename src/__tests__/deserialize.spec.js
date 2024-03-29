import { deserialize } from "../index";

const packetLK = "[SG*8800000015*0002*LK]";
const packetLKE = "[SG*8800000015*000D*LK,50,100,100]";
const packetUD =
  "[SG*5305994463*0178*UD,011119,103406,V,31.766222,N,35.190035,E,0.00,0.0,0.0,4,95,24,0,205,00000000,7,255,425,1,10472,10013,142,10471,10611,135,10472,10053,134,10471,10612,130,10471,10102,130,10471,10563,129,10472,11413,129,5,JCT-Lev-WiFi,b4:5d:50:bd:8c:e0,-80,JCT-Lev-WiFi,b4:5d:50:bd:99:80,-83,Home2,18:d6:c7:ef:1e:a7,-86,TP-LINK_AKA,3c:46:d8:c6:9a:f4,-90,JCT-Lev-WiFi,b4:5d:50:bd:c1:c0,-91,27.7]";
const packetUD2 =
  "[SG*8800000015*0088*UD2,220414,134652,A,22.571707,N,113.8613968,E,0.1,0.0,100,7,60,90,1000,50,0000,4,1,460,0,9360,4082,131,9360,4092,148,9360,4091,143,9360,4153,141]";
const packetAL =
  "[SG*8800000015*0087*AL,220414,134652,A,22.571707,N,113.8613968,E,0.1,0.0,100,7,60,90,1000,50,0001,4,1,460,0,9360,4082,131,9360,4092,148,9360,4091,143,9360,4153,141]";
const packetUPLOAD = "[SG*8800000015*0009*UPLOAD]";
const packetMONITOR = "[SG*8800000015*0007*MONITOR]";
const packetWAD =
  "[SG*8800000015*008B*WAD,CH,220414,134652,A,22.571707,N,113.8613968,E,0.1,0.0,100,7,60,90,1000,50,0001,4,1,460,0,9360,4082,131,9360,4092,148,9360,4091,143,9360,4153,141]";
const packetWG =
  "[SG*8800000015*0087*WG,220414,134652,A,22.571707,N,113.8613968,E,0.1,0.0,100,7,60,90,1000,50,0001,4,1,460,0,9360,4082,131,9360,4092,148,9360,4091,143,9360,4153,141]";

it("should parse the watch packets correctly", () => {
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
      longitude: 113.8613968,
      GSMStrength: 60,
      MCCCountryCode: 460,
      MNCNetworkCode: 0,
      altitude: 100,
      baseStationsNumber: 4,
      battery: 90,
      connectedToStation: 1,
      direction: 0,
      local: true,
      numberOfSatellites: 7,
      pedometer: 1000,
      rollingTime: 50,
      speed: 0.1,
      terminalState: "0000",
      baseStation1AreaCode: 9360,
      baseStation1Number: 4092,
      baseStation1SignalStrength: 148,
      baseStation2AreaCode: 9360,
      baseStation2Number: 4091,
      baseStation2SignalStrength: 143,
      baseStation3AreaCode: 9360,
      baseStation3Number: 4153,
      baseStation3SignalStrength: 141,
      baseStationAreaCode: 9360,
      baseStationNumber: 4082,
      baseStationSignalStrength: 131
    }
  };

  const expectedAL = {
    vendor: "SG",
    watchId: "8800000015",
    length: parseInt("87", 16),
    actionType: "AL",
    payload: {
      GSMStrength: 60,
      MCCCountryCode: 460,
      MNCNetworkCode: 0,
      altitude: 100,
      baseStation1AreaCode: 9360,
      baseStation1Number: 4092,
      baseStation1SignalStrength: 148,
      baseStation2AreaCode: 9360,
      baseStation2Number: 4091,
      baseStation2SignalStrength: 143,
      baseStation3AreaCode: 9360,
      baseStation3Number: 4153,
      baseStation3SignalStrength: 141,
      baseStationAreaCode: 9360,
      baseStationNumber: 4082,
      baseStationSignalStrength: 131,
      baseStationsNumber: 4,
      battery: 90,
      connectedToStation: 1,
      date: new Date("2014-04-22T11:46:52.000Z"),
      direction: 0,
      latitude: 22.571707,
      local: true,
      longitude: 113.8613968,
      numberOfSatellites: 7,
      pedometer: 1000,
      rollingTime: 50,
      speed: 0.1,
      terminalState: "0001"
    }
  };

  const expectedUPLOAD = {
    vendor: "SG",
    watchId: "8800000015",
    length: parseInt("9", 16),
    actionType: "UPLOAD",
    payload: {}
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
      GSMStrength: 60,
      MCCCountryCode: 460,
      MNCNetworkCode: 0,
      altitude: 100,
      baseStation1AreaCode: 9360,
      baseStation1Number: 4092,
      baseStation1SignalStrength: 148,
      baseStation2AreaCode: 9360,
      baseStation2Number: 4091,
      baseStation2SignalStrength: 143,
      baseStation3AreaCode: 9360,
      baseStation3Number: 4153,
      baseStation3SignalStrength: 141,
      baseStationAreaCode: 9360,
      baseStationNumber: 4082,
      baseStationSignalStrength: 131,
      baseStationsNumber: 4,
      battery: 90,
      connectedToStation: 1,
      direction: 0,
      latitude: 22.571707,
      local: true,
      longitude: 113.8613968,
      numberOfSatellites: 7,
      pedometer: 1000,
      rollingTime: 50,
      speed: 0.1,
      terminalState: "0001"
    }
  };

  const expectedWG = {
    vendor: "SG",
    watchId: "8800000015",
    length: parseInt("87", 16),
    actionType: "WG",
    payload: {
      GSMStrength: 60,
      MCCCountryCode: 460,
      MNCNetworkCode: 0,
      altitude: 100,
      baseStation1AreaCode: 9360,
      baseStation1Number: 4092,
      baseStation1SignalStrength: 148,
      baseStation2AreaCode: 9360,
      baseStation2Number: 4091,
      baseStation2SignalStrength: 143,
      baseStation3AreaCode: 9360,
      baseStation3Number: 4153,
      baseStation3SignalStrength: 141,
      baseStationAreaCode: 9360,
      baseStationNumber: 4082,
      baseStationSignalStrength: 131,
      baseStationsNumber: 4,
      battery: 90,
      connectedToStation: 1,
      date: new Date("2014-04-22T11:46:52.000Z"),
      direction: 0,
      latitude: 22.571707,
      local: true,
      longitude: 113.8613968,
      numberOfSatellites: 7,
      pedometer: 1000,
      rollingTime: 50,
      speed: 0.1,
      terminalState: "0001"
    }
  };

  expect(deserialize(packetLK)).toEqual(expectedLK);
  expect(deserialize(packetLKE)).toEqual(expectedLKE);
  expect(deserialize(packetUD)).toEqual(expectedUD);
  expect(deserialize(packetUD2)).toEqual(expectedUD2);
  expect(deserialize(packetAL)).toEqual(expectedAL);
  expect(deserialize(packetUPLOAD)).toEqual(expectedUPLOAD);
  expect(deserialize(packetMONITOR)).toEqual(expectedMONITOR);
  expect(deserialize(packetWAD)).toEqual(expectedWAD);
  expect(deserialize(packetWG)).toEqual(expectedWG);
});

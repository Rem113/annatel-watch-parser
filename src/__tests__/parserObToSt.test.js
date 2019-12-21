import { objectToString } from "../index";

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
    longitude: 35.190035
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

describe("parse object to string", () => {
  //   it("should parse LK object correctly", () => {
  //     const inputedLK = {
  //       vendor: "SG",
  //       watchId: "8800000015",
  //       length: "2",
  //       actionType: "LK",
  //       payload: {}
  //     };

  //     const expectedLK = "[SG*8800000015*0002*LK]";
  //     expect(objectToString(inputedLK)).toEqual(expectedLK);
  //   });

  it("should parse packets object correctly", () => {
    expect(objectToString(expectedLK)).toEqual(packetLK);
    //expect(objectToString(expectedLKE)).toEqual(packetLKE);
    //expect(objectToString(expectedUD)).toEqual(packetUD);
    //expect(objectToString(expectedUD2)).toEqual(packetUD2);
    //expect(objectToString(expectedAL)).toEqual(packetAL);
    expect(objectToString(expectedUPLOAD)).toEqual(packetUPLOAD);
    expect(objectToString(expectedMONITOR)).toEqual(packetMONITOR);
    //expect(objectToString(expectedWAD)).toEqual(packetWAD);
    //expect(objectToString(expectedWG)).toEqual(packetWG);
  });
});

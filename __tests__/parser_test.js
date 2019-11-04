import { parse, parseHeader, parseUpdateBody } from "../parser";

const packet1 =
  "[3G*5305994463*0178*UD,011119,103406,V,31.766222,N,35.190035,E,0.00,0.0,0.0,4,95,24,0,205,00000000,7,255,425,1,10472,10013,142,10471,10611,135,10472,10053,134,10471,10612,130,10471,10102,130,10471,10563,129,10472,11413,129,5,JCT-Lev-WiFi,b4:5d:50:bd:8c:e0,-80,JCT-Lev-WiFi,b4:5d:50:bd:99:80,-83,Home2,18:d6:c7:ef:1e:a7,-86,TP-LINK_AKA,3c:46:d8:c6:9a:f4,-90,JCT-Lev-WiFi,b4:5d:50:bd:c1:c0,-91,27.7]";

describe("parse", () => {
  it("should parse the packet correctly", () => {
    const expected = {
      vendor: "3G",
      id: "5305994463",
      length: 178,
      actionType: "UD",
      date: new Date("11/01/2019 10:34:06"), // mm/dd/yyyy hh:mm:ss
      latitude: 31.766222,
      longitude: 35.190035
    };

    expect(parse(packet1)).toEqual(expected);
  });
});

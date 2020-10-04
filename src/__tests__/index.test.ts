import path from "path";
import { teamSheetImage, resultImage, ResultDetails } from "../index";

jest.setTimeout(100000);

describe("teamSheetImage", () => {
  it("returns an output image path", async () => {
    const inImg = path.join(__dirname, "./img/in1.jpg");
    const outImg = path.join(__dirname, "./img/out1.jpg");
    const output = await teamSheetImage(inImg, outImg);
    expect(output).toEqual(outImg);
  });
});

describe("resultImage", () => {
  it("returns an output image path", async () => {
    const inImg = path.join(__dirname, "./img/in1.jpg");
    const outImg = path.join(__dirname, "./img/out2.jpg");
    const matchDetails = {
      teamName: "2nd XI",
      oppoName: "Chelmsford",
      venue: "Home",
      date: "5th October, 2020",
    };

    const resultDetails: ResultDetails = {
      innings: [{
        team: "SOSEMTCC",
        runs: 200,
        wickets: 6,
        dec: false,
        overs: 45,
      }, {
        team: "Chelmsford",
        runs: 155,
        wickets: 10,
        dec: false,
        overs: 42.2,
      }],
    };

    const output = await resultImage(
      inImg,
      outImg,
      matchDetails,
      resultDetails,
    );
    expect(output).toEqual(outImg);
  });
});

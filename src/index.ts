import fs from "fs";
import { createCanvas, loadImage } from "canvas";
import { writeHeader, writeInnings } from "./utils";

export interface MatchDetails {
  teamName: string;
  oppoName: string;
  venue: string;
  date: string;
}

export interface Innings {
  team: string;
  runs: number;
  wickets: number;
  dec: boolean;
  overs: number;
}

export interface ResultDetails {
  innings: [Innings, Innings];
}

interface ImageOptions {}

export const teamSheetImage = async (
  baseImage: string,
  outputPath: string,
  matchDetails?: MatchDetails,
  imageOptions?: ImageOptions,
): Promise<string> => {
  // const img = await Jimp.read(baseImage);
  // await img.resize(255, 255);
  // await img.write(outputPath);
  return outputPath;
};

export const resultImage = async (
  baseImage: string,
  outputPath: string,
  matchDetails: MatchDetails,
  ResultDetails: ResultDetails,
  imageOptions?: ImageOptions,
): Promise<string> => {
  const img = await loadImage(baseImage);

  const width = img.width;
  const height = img.height;
  let y = 0;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);

  const tenPC = width / 10;

  y = writeHeader(ctx, matchDetails, width / 2, y, height, width);

  y += y / 5;
  ctx.beginPath();

  ctx.globalAlpha = 0.5;
  ctx.fillStyle = "black";
  const contentWidth = width - (2 * tenPC);
  ctx.fillRect(tenPC, y, contentWidth, 1000);
  ctx.stroke();

  ctx.globalAlpha = 1;
  y = writeInnings(
    ctx,
    ResultDetails.innings[0],
    tenPC,
    y,
    height,
    width - (tenPC),
  );
  y = writeInnings(
    ctx,
    ResultDetails.innings[1],
    tenPC,
    y,
    height,
    width - (tenPC),
  );

  fs.writeFileSync(outputPath, canvas.toBuffer());

  return outputPath;
};

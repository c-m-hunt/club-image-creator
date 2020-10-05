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
  performances?: Performance[];
}

export interface Performance {
  name: string;
  performance: string;
}

export interface ResultDetails {
  innings: [Innings, Innings];
}

export interface ImageOptions {
  badgePath?: string;
}

// export const teamSheetImage = async (
//   baseImage: string,
//   outputPath: string,
//   matchDetails?: MatchDetails,
//   imageOptions?: ImageOptions,
// ): Promise<string> => {
//   return outputPath;
// };

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
  const inningsHeight = writeInnings(
    ctx,
    ResultDetails.innings[0],
    tenPC,
    y,
    height,
    width - (tenPC),
  );
  y += inningsHeight + (inningsHeight / 3);
  y += writeInnings(
    ctx,
    ResultDetails.innings[1],
    tenPC,
    y,
    height,
    width - (tenPC),
  );

  if (imageOptions.badgePath) {
    const imgBadge = await loadImage(imageOptions.badgePath);
    const aspectRatio = imgBadge.width / imgBadge.height;
    ctx.drawImage(
      imgBadge,
      0,
      0,
      imgBadge.width,
      imgBadge.height,
      img.width / 20,
      img.height - (img.width / 5) * aspectRatio - (img.width / 20),
      img.width / 5,
      (img.width / 5) * aspectRatio,
    );
  }

  fs.writeFileSync(outputPath, canvas.toBuffer());

  return outputPath;
};

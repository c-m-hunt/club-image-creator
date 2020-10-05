import { Context } from "vm";
import { MatchDetails, Innings } from "./index";

const font = "Arial";

const teamSizeRatio = 20;

export const writeHeader = (
  ctx: Context,
  matchDetails: MatchDetails,
  x: number,
  y: number,
  height: number,
  width: number,
) => {
  const headerFontSize = width / 15;
  ctx.font = `800 ${headerFontSize}px ${font}`;
  ctx.textAlign = "center";
  ctx.shadowOffsetX = headerFontSize / 20;
  ctx.shadowOffsetY = headerFontSize / 20;
  ctx.shadowBlur = headerFontSize / 20;
  ctx.shadowColor = "rgba(0,0,0,0.3)";
  const matchString =
    `${matchDetails.teamName} ${matchDetails.venue} v ${matchDetails.oppoName}`;
  y += headerFontSize + headerFontSize / 20;
  ctx.fillText(matchString, x, y);
  ctx.font = `800 ${headerFontSize / 1.5}px Arial`;
  y += headerFontSize / 1.5;
  ctx.fillText(
    matchDetails.date,
    width / 2,
    y,
  );
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = 0;
  return y;
};

interface TextOptions {
  color: string;
  align: "left" | "right" | "center";
  font: "Arial";
  fontSize: number;
  fontWeight: number;
}

const defaultTextOptions: TextOptions = {
  color: "white",
  align: "left",
  font: "Arial",
  fontSize: 20,
  fontWeight: 600,
};

export const writeText = (
  ctx: Context,
  string: string,
  x: number,
  y: number,
  options: Partial<TextOptions> = {},
) => {
  options = { ...defaultTextOptions, ...options };
  ctx.font = `${options.fontWeight} ${options.fontSize}px ${options.font}`;
  ctx.textAlign = options.align;
  ctx.fillStyle = options.color;
  ctx.fillText(string, x, y);
};

export const writeInnings = (
  ctx: Context,
  innings: Innings,
  x: number,
  y: number,
  height: number,
  width: number,
) => {
  let fontSize = width / teamSizeRatio;
  const yStart = y;
  y += fontSize + fontSize / teamSizeRatio;
  const xStart = x + width / 50;
  writeText(
    ctx,
    innings.team,
    xStart,
    y,
    { align: "left", color: "white", fontSize },
  );

  const inningsString =
    `${innings.runs.toString()}-${innings.wickets.toString()}${
      innings.dec ? " dec" : ""
    }`;

  writeText(
    ctx,
    inningsString,
    width - (x / 50) - (width / 50),
    y,
    { align: "right", fontSize },
  );

  y += fontSize * 1.2;
  writeText(
    ctx,
    `${innings.overs} overs`,
    width - (x / 50) - (width / 50),
    y,
    { fontWeight: 300, fontSize: width / 25, font, align: "right" },
  );

  if (innings.performances) {
    for (const p of innings.performances) {
      writeText(
        ctx,
        `${p.name} - ${p.performance}`,
        xStart,
        y,
        { fontWeight: 300, fontSize: width / 25, font, align: "left" },
      );
      y += fontSize * 1.2;
    }
  }
  if (innings.performances && innings.performances.length > 0) {
    y -= fontSize * 1.2;
  }

  return y - yStart;
};

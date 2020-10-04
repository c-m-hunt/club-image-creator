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

  return y;
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
  ctx.font = `600 ${fontSize}px ${font}`;
  ctx.textAlign = "left";
  ctx.fillStyle = "white";
  y += fontSize + fontSize / teamSizeRatio;
  const xStart = x + width / 50;
  ctx.fillText(innings.team, xStart, y);

  ctx.textAlign = "right";
  const inningsString =
    `${innings.runs.toString()}-${innings.wickets.toString()}${
      innings.dec ? " dec" : ""
    }`;
  ctx.fillText(inningsString, width - (x / 50) - (width / 50), y);

  fontSize = width / 25;
  ctx.font = `300 ${fontSize}px ${font}`;
  y += fontSize * 1.5;
  ctx.fillText(`${innings.overs} overs`, width - (x / 50) - (width / 50), y);

  ctx.textAlign = "left";
  if (innings.performances) {
    for (const p of innings.performances) {
      ctx.fillText(
        `${p.name} - ${p.performance}`,
        xStart,
        y,
      );
      y += fontSize * 1.5;
    }
  }
  if (innings.performances && innings.performances.length > 0) {
    y -= fontSize * 1.5;
  }

  return y - yStart;
};

import { Context } from "vm";

import { MatchDetails, Innings } from "./index";
export const writeHeader = (
  ctx: Context,
  matchDetails: MatchDetails,
  x: number,
  y: number,
  height: number,
  width: number,
) => {
  const headerFontSize = width / 15;
  ctx.font = `800 ${headerFontSize}px Arial`;
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
  const headerFontSize = width / 20;
  ctx.font = `600 ${headerFontSize}px Arial`;
  ctx.textAlign = "left";
  ctx.fillStyle = "white";
  y += headerFontSize + headerFontSize / 20;
  ctx.fillText(innings.team, x + width / 50, y);

  ctx.textAlign = "right";
  const inningsString =
    `${innings.runs.toString()}-${innings.wickets.toString()}`;
  ctx.fillText(inningsString, width - (x / 50) - (width / 50), y);

  return y;
};

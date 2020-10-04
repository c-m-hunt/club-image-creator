interface MatchDetails {
  teamName: string;
  oppoName: string;
}

interface ImageOptions {}

export default function teamSheetImage(
  baseImage: string,
  matchDetails: MatchDetails,
  imageOptions: ImageOptions
): void {}

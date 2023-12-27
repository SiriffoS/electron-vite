import { ICheckResult } from "_common/models/checkResult";
import { ableton } from "../..";

/**
 * @description Function that checks if the song is playing or stopped.
 * @param isPlayingCriteria: boolean - true if the song should be playing, false if the song should be stopped
 * @returns A promise with a boolean. True if the song playback status is the same as the criteria, otherwise false.
 * */
export async function checkSongIsPlayingStatus(
  isPlayingCriteria: boolean,
): Promise<ICheckResult> {
  const checkResult: ICheckResult = { isCorrect: false };

  const isPlayingActual: boolean = await ableton.song.get("is_playing");
  checkResult.isCorrect = isPlayingActual === isPlayingCriteria;
  checkResult.message = checkResult.isCorrect
    ? "Project is " + (isPlayingCriteria ? "playing." : "stopped.")
    : "Project is not " + (isPlayingCriteria ? "playing." : "stopped.");

  return Promise.resolve(checkResult);
}

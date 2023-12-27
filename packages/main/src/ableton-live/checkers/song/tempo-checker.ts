import { ICheckResult } from "_common/models/checkResult";
import { ableton } from "../..";

/**
 * @description Function that checks if the song tempo is correct.
 * @param tempoCriteria: number - the required tempo of the song
 * @returns A promise with a boolean. True if the song tempo is the same as the criteria, otherwise false.
 * */
export async function checkSongTempo(
  tempoCriteria: number,
): Promise<ICheckResult> {
  const checkResult: ICheckResult = { isCorrect: false };
  const tempoActual: number = await ableton.song.get("tempo");
  checkResult.isCorrect = tempoActual === tempoCriteria;
  checkResult.message = checkResult.isCorrect
    ? "Song tempo is correct."
    : "Song tempo is incorrect.";

  return Promise.resolve(checkResult);
}

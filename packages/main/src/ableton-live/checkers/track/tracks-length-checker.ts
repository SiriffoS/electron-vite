import { ICheckResult } from "_common/models/checkResult";
import { Track } from "ableton-js/ns/track";
import { ableton } from "../..";

/**
 * @description Function that checks that the tracks of the Session View have the correct number of tracks.
 * @param trackLengthMinCriteria: number - the minimum number of tracks in the song
 * @param trackLengthMaxCriteria: number - the maximum number of tracks in the song - can be the same as trackLengthMinCriteria
 * @returns A promise with a boolean. True if the actual number of tracks is between the min and max criteria, otherwise false.
 * */

export async function checkTrackLengthByMinAndMaxLength(
  trackLengthMinCriteria: number,
  trackLengthMaxCriteria: number,
): Promise<ICheckResult> {
  const checkResult: ICheckResult = { isCorrect: false };

  // Get the tracks
  const tracksActual: Track[] = await ableton.song.get("tracks");

  // Check if the number of tracks is between the min and max criteria
  if (
    tracksActual.length >= trackLengthMinCriteria &&
    tracksActual.length <= trackLengthMaxCriteria
  ) {
    checkResult.isCorrect = true;
    checkResult.message = "Correct number of tracks";
  } else {
    checkResult.isCorrect = false;
    checkResult.message = `Incorrect number of tracks.`;
  }

  return Promise.resolve(checkResult);
}

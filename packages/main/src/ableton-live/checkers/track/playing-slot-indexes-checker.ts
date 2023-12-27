import { ICheckResult } from "_common/models/checkResult";
import { ableton } from "../../index";
import { Track } from "ableton-js/ns/track";

/**
 * @description Function that checks that the tracks of the Session View have the correct playingSlotIndex.
 * @param playingSlotIndexesCriteria: number[] - the correct playingSlotIndex for each track. First slot has index 0, -2 = Clip Stop slot fired in Session View, -1 = Arrangement recording with no Session clip playing. [not in return/master tracks], e.g. [0, 1, -2, 3, 4, 5, 6, 7, 8, 9]
 * @returns Returns a promise with a boolean. True if the actual playingSlotIndexes is the same as the criteria, otherwise false.
 */
export async function checkClipsPlayingSlotIndexesByPlayingSlotIndexAtEachTrack(
  playingSlotIndexesCriteria: number[],
): Promise<ICheckResult> {
  const checkResult: ICheckResult = { isCorrect: false };

  // Get the tracks
  const tracksActual: Track[] = await ableton.song.get("tracks");

  // console.log("songHasCorrectPlayingSlotIndexes playingSlotIndexesCriteria", playingSlotIndexesCriteria);

  if (tracksActual.length !== playingSlotIndexesCriteria.length) {
    checkResult.isCorrect = false;
    checkResult.message =
      "Hmm, looks like you might have added or deleted track. Please re-open the project.";
    return Promise.resolve(checkResult);
  }

  let tracksWithCorrectPlayingSlotIndexCount = 0;
  let tracksWithIncorrectPlayingSlotIndexCount = 0;
  const trackNamesWithIncorrectPlayingSlotIndexes: string[] = [];

  // Loop over the users tracks
  for (let index = 0; index < tracksActual.length; index++) {
    // Get the playing slot index for the track in the users Ableton project, and compare it with the correct playing slot index
    const playingSlotIndexActual =
      await tracksActual[index].get("playing_slot_index");
    const playingSlotIndexCriteria = playingSlotIndexesCriteria[index];

    // If playing slot indexes does NOT match...
    if (playingSlotIndexActual !== playingSlotIndexCriteria) {
      tracksWithIncorrectPlayingSlotIndexCount++;
      const trackName: string = await tracksActual[index].get("name");
      trackNamesWithIncorrectPlayingSlotIndexes.push(trackName);
      continue;
    }
    tracksWithCorrectPlayingSlotIndexCount++;
  }

  if (trackNamesWithIncorrectPlayingSlotIndexes.length === 0) {
    checkResult.isCorrect = true;
    checkResult.message = "Well done, you are playing the correct clips";
  } else {
    checkResult.isCorrect = false;
    checkResult.message = `Incorrect clips playing on: ${trackNamesWithIncorrectPlayingSlotIndexes.join(
      ", ",
    )}`;
  }

  return Promise.resolve(checkResult);
}

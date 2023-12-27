import { ICheckResult } from "_common/models/checkResult";
import { ableton } from "../..";
import { Track } from "ableton-js/ns/track";

/**
 * @description Function that checks if the track types at the specified indexes are correct
 * @param trackIndexesAndTypesCriteria: [number, string][] - array of track indexes and types, either MIDI or Audio, e.g. [[0, "MIDI"], [1, "Audio"]]
 * @returns A Promise with an ICheckResult object containing a boolean indicating whether the track has the correct type, as well as any additional verification data.
 * */
export async function checkTrackTypesByIndex(
  trackIndexesAndTypesCriteria: [number, string][],
): Promise<ICheckResult> {
  const checkResult: ICheckResult = { isCorrect: false };

  const tracksActual: Track[] = await ableton.song.get("tracks");

  //Loop through the trackIndexesAndTypesCriteria array and check if the track type is correct
  for (let i = 0; i < trackIndexesAndTypesCriteria.length; i++) {
    //if the track type is MIDI, check if the track has MIDI input
    if (trackIndexesAndTypesCriteria[i][1] === "MIDI") {
      //get the track at the specified index
      checkResult.isCorrect =
        await tracksActual[trackIndexesAndTypesCriteria[i][0]].get(
          "has_midi_input",
        );
      //if the track type is Audio, check if the track has Audio input
    } else if (trackIndexesAndTypesCriteria[i][1] === "Audio") {
      checkResult.isCorrect =
        await tracksActual[trackIndexesAndTypesCriteria[i][0]].get(
          "has_audio_input",
        );
    }
    //if the track type is not correct, break out of the loop and return the checkResult
    if (!checkResult.isCorrect) {
      checkResult.message = `Track ${
        trackIndexesAndTypesCriteria[i][0] + 1
      } is not of type ${trackIndexesAndTypesCriteria[i][1]}`;
      break;
    }
  }

  //if all the track types are correct, set the checkResult to true and return it
  if (checkResult.isCorrect) {
    checkResult.message = "All tracks are of the correct type";
  }
  return checkResult;
}

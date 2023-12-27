import { Track } from "ableton-js/ns/track";
import { ICheckResult } from "_common/models/checkResult";
import { ableton } from "../..";

/**
 * @description Function that checks if the track names at the specified indexes are correct
 * @param trackIndexesAndNamesCriteria: [number, string][] - array of track indexes and names, e.g. [[0, "1 Bass"], [1, "2 Drums"]]
 * @returns A Promise with an ICheckResult object containing a boolean indicating whether the track has the correct name, as well as any additional verification data.
 */
export async function checkTrackNamesByIndex(
  trackIndexesAndNamesCriteria: [number, string][],
): Promise<ICheckResult> {
  const checkResult: ICheckResult = { isCorrect: false };
  const tracksActual: Track[] = await ableton.song.get("tracks");

  //Loop through the trackIndexesAndNamesCriteria array and check if the track name is correct
  for (let i = 0; i < trackIndexesAndNamesCriteria.length; i++) {
    //get the track at the specified index
    const trackActual: Track = tracksActual[trackIndexesAndNamesCriteria[i][0]];
    // Get the track name and normalize it (remove spaces and convert to lowercase)
    const trackNameActual: string = (await trackActual.get("name"))
      .replace(/[\s-]+/g, "")
      .toLowerCase();
    // Get the track name from the criteria and normalize it as well
    const trackNameCriteria: string = trackIndexesAndNamesCriteria[i][1]
      .replace(/[\s-]+/g, "")
      .toLowerCase();
    //check if the track name is correct
    if (trackNameActual !== trackNameCriteria) {
      checkResult.message = `Track ${
        trackIndexesAndNamesCriteria[i][0] + 1
      } name is incorrect`;
      return Promise.resolve(checkResult);
    }
  }

  checkResult.isCorrect = true;
  checkResult.message = "Track names are correct";
  return Promise.resolve(checkResult);
}

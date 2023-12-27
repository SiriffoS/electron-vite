import { ICheckResult } from "_common/models/checkResult";
import { ableton } from "../..";
import { Track } from "ableton-js/ns/track";
import { ClipSlot } from "ableton-js/ns/clip-slot";
import { Clip } from "ableton-js/ns/clip";

/**
 * @description Function that checks if the clip names at the specified clip slot indexes of the specified track indexes are correct
 * @param trackIndexesAndClipNamesCriteria: [number, [number, string][]][] - array of track indexes and clip slot indexes and names. If the clip slot should be empty, we will write null instead of a string, e.g. [[0, [[0, null], [1, "D2"]]], [1, [[0, "B1"], [1, null]]]]
 * @returns A Promise with an ICheckResult object containing a boolean indicating whether the track contains the correct clip names, as well as any additional verification data.
 * */
export async function checkClipNamesByTrackAndSlotIndexes(
  trackIndexesAndClipNamesCriteria: [number, [number, string][]][],
): Promise<ICheckResult> {
  const checkResult: ICheckResult = { isCorrect: false };
  const tracksActual: Track[] = await ableton.song.get("tracks");

  for (let i = 0; i < trackIndexesAndClipNamesCriteria.length; i++) {
    const trackActual: Track =
      tracksActual[trackIndexesAndClipNamesCriteria[i][0]];
    const clipSlots: ClipSlot[] = await trackActual.get("clip_slots");
    const clipNamesCriteria = trackIndexesAndClipNamesCriteria[i][1];

    for (let j = 0; j < clipNamesCriteria.length; j++) {
      const clipSlotActual: ClipSlot = clipSlots[clipNamesCriteria[j][0]];
      const clipActual: Clip | null = await clipSlotActual.get("clip");

      if (
        (clipActual === null && clipNamesCriteria[j][1] !== null) ||
        (clipActual !== null && clipNamesCriteria[j][1] === null)
      ) {
        checkResult.isCorrect = false;
        checkResult.message = `Hmm. Clip ${j + 1} on track ${i + 1} should ${
          clipActual === null ? "not " : ""
        }be empty.`;
        return checkResult;
      }

      if (clipActual !== null) {
        const clipNameActual = (await clipActual.get("name"))
          .replace(/[\s-]+/g, "")
          .toLowerCase();
        const clipNameCriteria = clipNamesCriteria[j][1]
          .replace(/[\s-]+/g, "")
          .toLowerCase();

        if (!clipNameActual || clipNameActual !== clipNameCriteria) {
          checkResult.isCorrect = false;
          checkResult.message = `Hmm. Clip ${j + 1} on track ${
            i + 1
          } has the wrong name`;
          return checkResult;
        }
      }
    }
  }
  checkResult.message = "Clip names are correct";
  checkResult.isCorrect = true;
  return checkResult;
}

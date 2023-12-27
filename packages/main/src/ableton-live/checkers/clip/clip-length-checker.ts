import { ICheckResult } from "_common/models/checkResult";
import { ableton } from "../../index";
import { Track } from "ableton-js/ns/track";
import { ClipSlot } from "ableton-js/ns/clip-slot";
import { Clip } from "ableton-js/ns/clip";

/**
 * @description Function that checks if the clip length is correct at the specified track and clip slot index.
 * @param trackIndex: number - the index of the track
 * @param clipSlotIndex: number - the index of the clip slot
 * @param clipLengthCriteria: number - the required length of the clip
 * @returns
 */
export async function checkClipLengthByTrackAndClipSlotIndex(
  trackIndex: number,
  clipSlotIndex: number,
  clipLengthCriteria: number,
): Promise<ICheckResult> {
  const checkResult: ICheckResult = { isCorrect: false };

  const tracksActual: Track[] = await ableton.song.get("tracks");
  const clipSlotsActual: ClipSlot[] =
    await tracksActual[trackIndex].get("clip_slots");
  const clipActual: Clip | null =
    await clipSlotsActual[clipSlotIndex].get("clip");

  if (clipActual === null) {
    return checkResult;
  } else {
    const clipLength = await clipActual.get("length");
    //console.log("Clip Length:", clipLength);

    checkResult.isCorrect = clipLength === clipLengthCriteria;

    if (!checkResult.isCorrect) {
      checkResult.message =
        "Clip length is incorrect at track " +
        (trackIndex + 1) +
        " and clip slot " +
        (clipSlotIndex + 1);
    } else {
      checkResult.message =
        "Clip length is correct at track " +
        (trackIndex + 1) +
        " and clip slot " +
        (clipSlotIndex + 1);
    }
  }

  return checkResult;
}

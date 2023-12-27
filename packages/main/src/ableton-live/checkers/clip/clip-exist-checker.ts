import { ICheckResult } from "_common/models/checkResult";
import { ableton } from "../..";
import { Track } from "ableton-js/ns/track";
import { ClipSlot } from "ableton-js/ns/clip-slot";

/**
 * @description Function that checks if a clip exists in the specified track at a given clip slot index. Uses the has_clip property of the ClipSlot object.
 * @param trackIndex: number - the index of the track
 * @param clipSlotIndex: number - the index of the clip slot
 * @param hasClipCriteria: boolean - true if the clip should exist, false if the clip should NOT exist
 * @returns A Promise with an ICheckResult object containing a boolean indicating whether the clip existance is correct, as well as any additional verification data.
 */
export async function checkClipExistByTrackAndClipSlotIndex(
  trackIndex: number,
  clipSlotIndex: number,
  hasClipCriteria: boolean,
): Promise<ICheckResult> {
  const checkResult: ICheckResult = { isCorrect: false };

  const tracksActual: Track[] = await ableton.song.get("tracks");
  const clipSlotsActual: ClipSlot[] =
    await tracksActual[trackIndex].get("clip_slots");
  const clipSlotActual: ClipSlot = await clipSlotsActual[clipSlotIndex];
  const hasClipActual: boolean = await clipSlotActual.get("has_clip");

  if (hasClipActual === hasClipCriteria) {
    checkResult.isCorrect = true;
    checkResult.message = `Correct. Clip ${
      hasClipCriteria ? "exist" : "does not exist"
    } at track ${trackIndex + 1} and clip slot ${clipSlotIndex + 1}`;
  } else {
    checkResult.isCorrect = false;
    checkResult.message = `Incorrect. Clip ${
      hasClipCriteria ? "does not exist" : "exists"
    } at track ${trackIndex + 1} and clip slot ${clipSlotIndex + 1}`;
  }

  return checkResult;
}

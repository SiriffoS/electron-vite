import { ICheckResult } from "_common/models/checkResult";
import { Clip } from "ableton-js/ns/clip";
import { ClipSlot } from "ableton-js/ns/clip-slot";
import { Track } from "ableton-js/ns/track";
import { Note } from "ableton-js/util/note";
import { ableton } from "../..";

/**
 *@
 * @description Function to check if if the clip at the specifiied location, contains the criteria notes, and only these.
 * @param trackIndex The index of the track that contains the clip
 * @param clipSlotIndex The clip slot index of the track that contains the clip
 * @param notesCriteria The required notes
 * @param checkPitch Whether each note pitch should be checked
 * @param checkTime wWether each note time should be checked
 * @param checkDuration Whether each note duration should be checked
 * @param checkVelocity Whether each note velocity should be checked
 * @param checkMuted Whether each note muted status should be checked
 * @returns
 */
export async function checkClipNotesByTrackAndClipSlotIndex(
  trackIndex: number,
  clipSlotIndex: number,
  notesCriteria: Note[],
  checkPitch: boolean,
  checkTime: boolean,
  checkDuration: boolean,
  checkVelocity: boolean,
  checkMuted: boolean,
): Promise<ICheckResult> {
  const checkResult: ICheckResult = { isCorrect: false };

  // Get the tracks of the song
  const tracksActual: Track[] = await ableton.song.get("tracks");

  // Get the clip slots of the target trackIndex
  const clipSlotsActual: ClipSlot[] =
    await tracksActual[trackIndex].get("clip_slots");
  const clipActual: Clip | null =
    await clipSlotsActual[clipSlotIndex].get("clip");

  if (!clipActual) {
    return checkResult;
  }

  // The range of the notes, we wish to request from the clip in Ableton
  const fromTime = 0;
  const fromPitch = 0;
  const timeSpan: number = await clipActual.get("length");
  const pitchSpan = 127;

  // Get the actual notes from Ableton
  const notesActual: Note[] = await clipActual.getNotes(
    fromTime,
    fromPitch,
    timeSpan,
    pitchSpan,
  );

  // Check if the user forgot to add any notes to the clip
  if (notesActual.length === 0 && notesCriteria.length > 0) {
    checkResult.isCorrect = false;
    checkResult.message =
      "Hmm. No notes detected in the clip. Make sure you are editing the correct clip.";
    return checkResult;
  }

  // Check which notes are correct and which are wrong
  const notesCorrect: Note[] = [];
  const notesIncorrect: Note[] = [];

  // For each actual note
  for (let i = 0; i < notesActual.length; i++) {
    const noteActual: Note = notesActual[i];

    // For each criteria note - check if the note is contained in the criteria clip
    for (let y = 0; y < notesCriteria.length; y++) {
      const noteCriteria = notesCriteria[y];

      const noteCheckResults: boolean[] = [];

      // Check only the required properties of the notes
      checkPitch
        ? noteCheckResults.push(noteActual.pitch === noteCriteria.pitch)
        : null;
      checkTime
        ? noteCheckResults.push(noteActual.time === noteCriteria.time)
        : null;
      checkDuration
        ? noteCheckResults.push(noteActual.duration === noteCriteria.duration)
        : null;
      checkVelocity
        ? noteCheckResults.push(noteActual.velocity === noteCriteria.velocity)
        : null;
      checkMuted
        ? noteCheckResults.push(noteActual.muted === noteCriteria.muted)
        : null;
      // If all required properties are correct -> the actual note is correct
      if (noteCheckResults.every((check) => check === true)) {
        notesCorrect.push(noteActual);
        break;
      }

      // If the note has been compared with all criteria notes, without matching any -> it must be an incorrect note
      else if (y === notesCriteria.length - 1) {
        notesIncorrect.push(noteActual);
      }
    }
  }
  // Create the verification result including the message
  // Verification result is correct if it has all the correct notes, and no incorrect ones.
  checkResult.isCorrect =
    notesCorrect.length === notesCriteria.length && notesIncorrect.length === 0;

  if (checkResult.isCorrect) {
    checkResult.message = "Well done. Your clip notes are correct.";
  } else {
    checkResult.message =
      "Hmm, looks like you didn't get the clip notes right.";
    // if (notesCorrect.length > 0) {
    //   checkResult.message +=
    //     " " +
    //     notesCorrect.length +
    //     " " +
    //     (notesCorrect.length > 1 ? "notes correct." : "note correct.");
    // }
  }
  return checkResult;
}
